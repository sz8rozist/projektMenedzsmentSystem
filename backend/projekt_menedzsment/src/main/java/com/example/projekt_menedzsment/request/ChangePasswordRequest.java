package com.example.projekt_menedzsment.request;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ChangePasswordRequest {
    private Long userId;
    private String oldPassword;
    private String newPassword;
}
