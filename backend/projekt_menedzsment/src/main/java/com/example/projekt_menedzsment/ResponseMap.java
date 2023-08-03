package com.example.projekt_menedzsment;

import java.util.HashMap;
import java.util.Map;

public class ResponseMap {
    public static Map<String, String> create(Object ...args) {
        if (args.length % 2 != 0) {
            throw new IllegalArgumentException("A kulcs-érték párok száma páratlan.");
        }
        Map<String, String> errorMap = new HashMap<>();
        for (int i = 0; i < args.length; i += 2) {
            if (!(args[i] instanceof String key) || !(args[i + 1] instanceof String errorMessage)) {
                throw new IllegalArgumentException("A kulcs és az üzenet csak String típusú lehet.");
            }
            errorMap.put(key, errorMessage);
        }
        return errorMap;
    }
}
