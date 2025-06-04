package com.example.project.entity;

import java.time.LocalDate;

import com.example.project.entity.constant.Gender;

import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.Entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor

@Entity
public class Member {

    @Id
    private String mEmail;

    @Column(nullable = false)
    private String mName;

    @Column(nullable = false)
    private String mAddress;

    @Column(nullable = false)
    private String mMobile;

    @Column(nullable = false)
    private LocalDate mBirthday;

    @Column(nullable = false)
    private String mPassword;

    @Enumerated(EnumType.STRING)
    @Column(name = "M_GENDER", nullable = false)
    private Gender mGender;

    public void changemAddress(String mAddress) {
        this.mAddress = mAddress;
    }

    public void changemMobile(String mMobile) {
        this.mMobile = mMobile;
    }

    public void changemPassword(String mPassword) {
        this.mPassword = mPassword;
    }
    
}
