package com.ssafy.mybuddy.controller;


import com.ssafy.mybuddy.dto.AnswerDto;
import com.ssafy.mybuddy.dto.ChildrenDto;
import com.ssafy.mybuddy.dto.MemberDto;
import com.ssafy.mybuddy.jwt.JwtTokenProvider;
import com.ssafy.mybuddy.service.AnswerService;
import com.ssafy.mybuddy.service.ChildrenService;
import com.ssafy.mybuddy.service.MemberService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Api("MemberController")
@RestController
@CrossOrigin(origins = "*", allowedHeaders = "X-AUTH-TOKEN", maxAge = 3600)
@RequestMapping("/member")
public class MemberController {
    public static final Logger logger = LoggerFactory.getLogger(MemberController.class);
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

//    @Autowired
//    private JwtServiceImpl jwtService;

    @Autowired
    private MemberService memberService;

    @Autowired
    private ChildrenService childrenService;

    @Autowired
    private AnswerService answerService;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @ApiOperation(value="회원가입", notes="회원 정보를 받아 회원 가입을 수행한다. 성공 여부에 따라 'success' 또는 'fail'을 반환한다.", response=String.class)
    @PostMapping("/signup")
    public ResponseEntity<String> registMember(@RequestBody @ApiParam(value="회원가입 시 필요한 회원정보(이름, 전화번호, 이메일, 비밀번호)", required = true) MemberDto memberDto) {
        logger.debug("registMember 호출 : {}", memberDto);

        if(!memberService.checkEmail(memberDto.getEmail())) {
            return new ResponseEntity<>("email error", HttpStatus.FORBIDDEN);
        }

        if(memberService.insertMember(memberDto)) {
            return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
        }
        return new ResponseEntity<String>(FAIL, HttpStatus.FORBIDDEN);
    }

//    @ApiOperation(value="로그인", notes="이메일과 비밀번호를 받아 로그인을 수행한다. 성공 여부에 따라 'success' 또는 'fail'을 반환한다.", response = Map.class)
//    @PostMapping("/login")
//    public ResponseEntity<Map<String, Object>> login(@RequestBody @ApiParam(value="로그인 시 필요한 회원정보(이메일, 비밀번호)", required = true) MemberDto memberDto) {
//
//        Map<String, Object> resultMap = new HashMap<>();
//        HttpStatus status;
//
//        try {
//            MemberDto loginMember = memberService.login(memberDto);
//            if(loginMember != null) {
//                String token = jwtService.create("memberEmail", loginMember.getEmail(), "access-token"); // key, data, subject
//                logger.debug("로그인 토큰정보 : {}", token);
//                resultMap.put("access-token", token);
//                resultMap.put("message", SUCCESS);
//                status = HttpStatus.ACCEPTED;
//            } else {
//                resultMap.put("message", FAIL);
//                status = HttpStatus.ACCEPTED;
//            }
//        } catch(Exception e) {
//            logger.error("로그인 실패 : {}", e);
//            resultMap.put("message", e.getMessage());
//            status = HttpStatus.INTERNAL_SERVER_ERROR;
//        }
//        return new ResponseEntity<>(resultMap, status);
//    }


    @ApiOperation(value="로그인", notes="이메일과 비밀번호를 받아 로그인을 수행한다. 성공 여부에 따라 'success' 및 Token 또는 'fail'을 반환한다.", response = Map.class)
    @PostMapping("login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody @ApiParam(value="로그인 시 필요한 회원정보(이메일, 비밀번호)", required = true) MemberDto memberDto) {

        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status;

        try {
            MemberDto loginMember = memberService.login(memberDto);
            if(loginMember != null) {
//                resultMap.put("memberInfo", loginMember);
                resultMap.put("token", jwtTokenProvider.createToken(loginMember.getEmail()));
                resultMap.put("message", SUCCESS);
                status = HttpStatus.ACCEPTED;
            } else {
                resultMap.put("message", FAIL);
                status = HttpStatus.FORBIDDEN;
            }
        } catch(Exception e) {
            logger.error("로그인 실패 : {}", e);
            resultMap.put("message", e.getMessage());
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }

        return new ResponseEntity<>(resultMap, status);
    }

    @ApiOperation(value="회원 전체 목록", notes="모든 회원의 정보를 반환한다.", response = List.class)
    @GetMapping
    public ResponseEntity<List<MemberDto>> retrieveMember() {
        logger.debug("retrieveMember 호출");
        return new ResponseEntity<List<MemberDto>>(memberService.retrieveMember(), HttpStatus.OK);
    }

    @ApiOperation(value="회원 정보", notes="Header로 전달된 토큰에 해당하는 회원의 정보를 반환한다.", response = MemberDto.class)
    @GetMapping("info")
    public ResponseEntity<MemberDto> selectMember(HttpServletRequest request) throws Exception {
        logger.debug("selectMember 호출");

        String email = (String) request.getAttribute("email");

        MemberDto currentMember = memberService.selectMemberByEmail(email);

        List<ChildrenDto> childrens = childrenService.retrieveChildren(currentMember.getMemberID());

        currentMember.setChildrens(childrens);

        for(int i = 0; i < childrens.size(); i++) {
            List<AnswerDto> answers = answerService.allAnswers(childrens.get(i).getChildrenID());
            childrens.get(i).setAnswers(answers);
        }

        return new ResponseEntity<MemberDto>(currentMember, HttpStatus.OK);

    }

    @ApiOperation(value="회원 정보 업데이트", notes="회원의 정보를 수정한다. 성공 여부에 따라 'success' 또는 'fail'을 반환한다. ", response=String.class)
    @PutMapping
    public ResponseEntity<String> updateMember(@ApiParam(value = "회원의 수정할 정보(memberID, 전화번호, 이름)", required = true) @RequestBody MemberDto memberDto) {
        logger.debug("updateMember 호출");
        if(memberService.updateMember(memberDto)) {
            return new ResponseEntity<>(SUCCESS, HttpStatus.OK);
        }
        return new ResponseEntity<>(FAIL, HttpStatus.NO_CONTENT);
    }

    @ApiOperation(value = "회원 삭제", notes = "회원 삭제를 수행한다(memberID). 성공 여부에 따라 'success' 또는 'fail'을 반환한다.", response=String.class)
    @DeleteMapping("{memberID}")
    public ResponseEntity<String> deleteMember(@PathVariable  @ApiParam(value = "삭제할 회원의 아이디.", required = true) int memberID) {
        logger.debug("deleteMember 호출");
        if(memberService.deleteMember(memberID)) {
            return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
        }
        return new ResponseEntity<String>(FAIL, HttpStatus.NO_CONTENT);
    }

    @ApiOperation(value = "이메일 중복 검사", notes = "해당 이메일이 사용 가능한지 판단한다. 사용 여부에 따라 'success' 또는 'fail'을 반환한다.", response=String.class)
    @PostMapping("check")
    public ResponseEntity<String> checkEmail(@RequestBody @ApiParam(value = "중복 검사할 이메일", required = true) MemberDto memberDto) {
        logger.debug("이메일 중복 검사 checkEmail 호출 {}", memberDto);
        String email = memberDto.getEmail();
        logger.debug("이메일 중복 검사 checkEmail 호출 {}", email);
        if(memberService.checkEmail(email)) {
            return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
        }
        return new ResponseEntity<String>(FAIL, HttpStatus.NO_CONTENT);
    }

    @ApiOperation(value="부모 이메일 반환", notes="Children의 ID를 통해 Member의 정보를 반환한다.", response = String.class)
    @GetMapping("/iot/{childrenID}")
    public ResponseEntity<String> getEmailByChildrenId(@PathVariable int childrenID) {
        String email = memberService.getEmailByChildrenId(childrenID);
        System.out.println("email 반환 : " + email);
        return new ResponseEntity<>(email, HttpStatus.OK);
    }
}
