package com.example.hotelmanage.auth.sec;

import org.springframework.util.StringUtils;

import java.lang.reflect.Field;
import java.util.regex.Pattern;

public class InputValidator {
    private static final Pattern XSS_PATTERN = Pattern.compile(
            "(<script.*?>.*?</script.*?>)|(<.*?on\\w+\\s*=)|(<.*?javascript:.*?>)|(<.*?>)",
            Pattern.CASE_INSENSITIVE | Pattern.DOTALL);

    private static final Pattern SQL_INJECTION_PATTERN = Pattern.compile("(?i)\\b(SELECT|DROP|INSERT|DELETE|UPDATE|OR|AND|--|;|'|\")\\b");

    public static boolean containsXSS(String input) {
        if (!StringUtils.hasText(input)) {
            return false;
        }
        return XSS_PATTERN.matcher(input).find();
    }

    public static void validateNoXSS(Object obj) throws IllegalArgumentException {
        if (obj == null) return;
        Field[] fields = obj.getClass().getDeclaredFields();
        for (Field field : fields) {
            if (field.getType().equals(String.class)) {
                field.setAccessible(true);
                try {
                    String value = (String) field.get(obj);
                    if (value != null && containsXSS(value)) {
                        throw new IllegalArgumentException("Pole '" + field.getName() + "' zawiera niedozwolone znaki XSS");
                    }
                } catch (IllegalAccessException e) {
                    throw new IllegalArgumentException(e.getMessage());
                }
            }
        }
    }

    public static void validateNoSqlInjection(Object request) throws IllegalAccessException {
        Field[] fields = request.getClass().getDeclaredFields();
        for (Field field : fields) {
            if (field.getType().equals(String.class)) {
                field.setAccessible(true);
                String value = (String) field.get(request);
                if (value != null && SQL_INJECTION_PATTERN.matcher(value).find()) {
                    throw new IllegalArgumentException("Pole '" + field.getName() + "' zawiera niedozwolone znaki lub słowa");
                }

            }
        }
    }

}
