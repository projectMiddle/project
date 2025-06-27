package com.example.project.dto;

import java.time.LocalDate;
import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.example.project.entity.Department;
import com.example.project.entity.JobRank;
import com.example.project.entity.constant.Gender;
import com.example.project.entity.constant.MemberRole;

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
public class EmployeeDTO implements UserDetails {

    private Long empNo;

    private String eName;

    private Gender eGender;

    private LocalDate eBirthday;

    private String eEmail;

    private String eAddress;

    private String eMobile;

    private String eAccount;

    private String ePassword;

    private MemberRole mMemberRole;

    private LocalDate eHiredate;

    private LocalDate eLeavedate;

    private Long eSalary;

    private Department deptNo;

    private JobRank jobNo;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("ROLE_" + mMemberRole.name()));
    }

    @Override
    public String getPassword() {
        return ePassword;
    }

    @Override
    public String getUsername() {
        return String.valueOf(empNo);
        // return empNo;
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
