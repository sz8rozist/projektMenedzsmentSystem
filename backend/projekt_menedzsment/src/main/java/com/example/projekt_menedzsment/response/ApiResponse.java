package com.example.projekt_menedzsment.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class ApiResponse<T> {

    int recordCount = 0;
    String message;
    T response;
}
