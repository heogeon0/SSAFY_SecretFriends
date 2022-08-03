package com.ssafy.mybuddy.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@ToString
@ApiModel(value="MemberDto : 회원정보", description = "회원의 상세 정보를 나타낸다")
public class MemberDto {
    @ApiModelProperty(value="회원 번호")
    private int memberID;
    @ApiModelProperty(value="회원 이름")
    private String name;
    @ApiModelProperty(value="회원 전화번호")
    private String phoneNumber;
    @ApiModelProperty(value="회원 이메일")
    private String email;
    @ApiModelProperty(value="회원 비밀번호")
    private String password;
    @ApiModelProperty(value="회원 권한(사용자/관리자)")
    private Boolean isSuperuser;

    private List<ChildrenDto> childrens;
}
