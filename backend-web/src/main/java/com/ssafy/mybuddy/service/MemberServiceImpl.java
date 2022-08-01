package com.ssafy.mybuddy.service;


import com.ssafy.mybuddy.dto.MemberDto;
import com.ssafy.mybuddy.mapper.MemberMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MemberServiceImpl implements MemberService {

    @Autowired
    private MemberMapper memberMapper;

    @Override
    public boolean insertMember(MemberDto memberDto) {
        return memberMapper.insertMember(memberDto) == 1;
    }
    @Override
    public MemberDto login(MemberDto memberDto) {
        if(memberDto.getEmail() == null || memberDto.getPassword() == null) {
            return  null;
        }
        return memberMapper.login(memberDto);
    }
    @Override
    public List<MemberDto> retrieveMember() {
        return memberMapper.retrieveMember();
    }
    @Override
    public boolean deleteMember(int memberId) {
        return memberMapper.deleteMember(memberId) == 1;
    }
    @Override
    public boolean checkEmail(String email) {
        // 해당 아이디가 사용 중이면 1 리턴, 사용 중이지 않으면 0 리턴
        return memberMapper.selectEmail(email) == 0;
    }

    @Override
    public MemberDto selectMember(int memberId) {
        return memberMapper.selectMember(memberId);
    }

    @Override
    public MemberDto selectMemberByEmail(String memberEmail) {
        return memberMapper.selectMemberByEmail(memberEmail);
    }

    @Override
    public boolean updateMember(MemberDto memberDto) {
        return memberMapper.updateMember(memberDto) == 1;
    }
}
