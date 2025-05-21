package com.example.hotelmanage.auth.sec;

import io.github.bucket4j.Bandwidth;
import io.github.bucket4j.Bucket;
import io.github.bucket4j.Bucket4j;
import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.time.Duration;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
@Order(1)
public class RateLimitFilter extends OncePerRequestFilter implements Ordered {

    private final Map<String, Bucket> buckets = new ConcurrentHashMap<>();
    private final Map<String, Long> blockedUntil = new ConcurrentHashMap<>();

    private Bucket resolveBucket(String ip) {
        return buckets.computeIfAbsent(ip, k ->
                Bucket4j.builder()
                        .addLimit(Bandwidth.simple(5, Duration.ofMinutes(1)))
                        .build()
        );
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        if ("/auth/login".equals(request.getRequestURI())) {
            String ip = request.getRemoteAddr();

            Long blockedTime = blockedUntil.get(ip);
            long now = System.currentTimeMillis();

            if (blockedTime != null && blockedTime > now) {
                response.setStatus(429);
                response.getWriter().write("Too many login attempts. Try again later.");
                return;
            }

            Bucket bucket = resolveBucket(ip);

            if (!bucket.tryConsume(1)) {
                blockedUntil.put(ip, now + Duration.ofMinutes(1).toMillis()); // blokada na 1 min
                response.setStatus(429);
                response.getWriter().write("Too many login attempts. Try again later.");
                return;
            }
        }

        filterChain.doFilter(request, response);
    }

    @Override
    public int getOrder() {
        return 1;
    }
}
