package com.tsms.dto;

import lombok.*;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class UserDto {
    private Long id;
    private String userName;
    private String email;
    private String phoneNumber;
    private String role;
}
