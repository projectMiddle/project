package com.example.project.dto;

import java.time.LocalDate;
import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.example.project.entity.constant.Gender;
import com.example.project.entity.constant.MemberRole;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
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
public class MemberDTO implements UserDetails {

    @Email(message = "이메일 형식을 확인해 주세요")
    @NotBlank(message = "이메일은 필수 요소 입니다")
    @JsonProperty("mEmail")
    private String mEmail;

    @NotBlank(message = "이름을 입력해 주세요요")
    @JsonProperty("mName")
    private String mName;

    @NotBlank(message = "주소를 입력해 주세요요")
    @JsonProperty("mAddress")
    private String mAddress;

    @NotBlank(message = "전화번호를 입력해 주세요요")
    @JsonProperty("mMobile")
    private String mMobile;

    @NotNull(message = "생일을 입력해 주세요")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    @JsonProperty("mBirthday")
    private LocalDate mBirthday;

    @NotBlank(message = "비밀번호를 입력해 주세요")
    @Size(min = 4, message = "4자리 이상 입력해 주세요")
    @JsonProperty("mPassword")
    private String mPassword;

    @NotNull(message = "성별을 확인해 주세요요")
    @JsonProperty("mGender")
    private Gender mGender;

    private MemberRole mMemberRole;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {

        return List.of(new SimpleGrantedAuthority("ROLE_" + mMemberRole.name()));
    }

    @Override
    public String getPassword() {
        return mPassword;
    }

    @Override
    public String getUsername() {
        return mEmail;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

}
