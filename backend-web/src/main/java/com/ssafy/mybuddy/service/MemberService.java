package com.ssafy.mybuddy.service;

import com.ssafy.mybuddy.dto.MemberDto;

import java.util.List;

public interface MemberService {
    boolean insertMember(MemberDto memberDto);

    MemberDto login(MemberDto memberDto);

    List<MemberDto> retrieveMember();

    boolean deleteMember(int memberId);

    boolean checkEmail(String email);

    MemberDto selectMember(int memberId);

    MemberDto selectMemberByEmail(String memberEmail);

    boolean updateMember(MemberDto memberDto);

}
