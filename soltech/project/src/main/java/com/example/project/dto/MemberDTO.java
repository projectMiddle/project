package com.example.project.dto;

import java.time.LocalDate;

import com.example.project.entity.constant.Gender;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
@Getter
@Setter
public class MemberDTO {
    
    private String mEmail;

    private String mName;

    private String mAddress;

    private String mMobile;

    private LocalDate mBirthday;

    private String mPassword;

    private Gender mGender;

}
