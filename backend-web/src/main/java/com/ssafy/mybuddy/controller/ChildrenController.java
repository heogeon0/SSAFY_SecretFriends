package com.ssafy.mybuddy.controller;

import com.ssafy.mybuddy.dto.ChildrenDto;
import com.ssafy.mybuddy.service.AnswerService;
import com.ssafy.mybuddy.service.ChildrenService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@Api("ChildrenController")
@RestController
@CrossOrigin("*")
@RequestMapping("/children")
public class ChildrenController {


    public static final Logger logger = LoggerFactory.getLogger(ChildrenController.class);
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    @Autowired
    private ChildrenService childrenService;

    @Autowired
    private AnswerService answerService;

    @ApiOperation(value="아이 등록", notes="아이의 정보를 받아 등록을 수행한다. 성공 여부에 따라 'success' 또는 'fail'을 반환한다.", response = String.class)
    @PostMapping
    public ResponseEntity<HashMap> registChildren(@RequestBody @ApiParam(value="아이 등록 시 필요한 정보(생년, 생월, 생일, 이름, 별명, 입원일, 회원 아이디(memberID)", required = true) ChildrenDto childrenDto) {
        logger.debug("registChildren 호출 : {}", childrenDto);
        HashMap<String, String> map = new HashMap<>();
        if(childrenService.insertChildren(childrenDto)) {
            System.out.println("key : " + childrenDto.getChildrenID());
            map.put("message", SUCCESS);
            map.put("childrenID", childrenDto.getChildrenID() + "") ;
            return new ResponseEntity<>(map, HttpStatus.OK);
        }
        map.put("message" , FAIL);
        return new ResponseEntity<HashMap>(map, HttpStatus.NO_CONTENT);
    }

    @ApiOperation(value="회원의 아이 조회", notes="memberID에 해당하는 회원의 아이들 정보를 반환한다.", response = List.class)
    @GetMapping("list/{memberID}")
    public ResponseEntity<List<ChildrenDto>> retrieveChildren(@PathVariable @ApiParam(value = "아이들을 조회할 회원의 번호.", required = true) int memberID) {
        logger.debug("memberID의 전체 아이 정보를 리턴 : {}" , memberID);
        return new ResponseEntity<>(childrenService.retrieveChildren(memberID), HttpStatus.OK);
    }

    @ApiOperation(value="아이 정보", notes="childrenID 해당하는 아이의 정보를 반환한다.", response = ChildrenDto.class)
    @GetMapping("{childrenID}")
    public ResponseEntity<ChildrenDto> selectChildren(@PathVariable @ApiParam(value = "조회할 아이 번호", required = true) int childrenID) {
        logger.debug("childrenID에 해당하는 아이 정보를 리턴 : {}" , childrenID);
        return new ResponseEntity<>(childrenService.selectChildren(childrenID), HttpStatus.OK);
    }

    @ApiOperation(value="아이 정보(IOT)", notes="childrenID 해당하는 아이의 정보를 반환한다.", response = ChildrenDto.class)
    @GetMapping("iot/{childrenID}")
    public ResponseEntity<ChildrenDto> selectChildrenForIot(@PathVariable @ApiParam(value = "조회할 아이 번호", required = true) int childrenID) {
        childrenService.updateVisitCount(childrenID); // 아이 정보 조회 시 방문횟수 증가
        logger.debug("childrenID에 해당하는 아이 정보를 리턴 : {}" , childrenID);
        return new ResponseEntity<>(childrenService.selectChildren(childrenID), HttpStatus.OK);
    }

    @ApiOperation(value="아이 정보 업데이트", notes="아이의 정보를 업데이트", response = String.class)
    @PutMapping
    public ResponseEntity<String> updateChildren(@RequestBody  @ApiParam(value = "갱신할 아이의 정보를 입력받아 업데이트한다.(childrenID, 생년, 생월, 생일, 이름, 별명, 입원일(Format : YYYY-MM-DD))", required = true)  ChildrenDto childrenDto) {
        logger.debug("updateMember 호출");
        if(childrenService.updateChildren(childrenDto)) {
            return new ResponseEntity<>(SUCCESS, HttpStatus.OK);
        }
        return new ResponseEntity<>(FAIL, HttpStatus.NO_CONTENT);
    }

    @ApiOperation(value="아이 삭제", notes="childrenID에 해당하는 아이를 삭제한다.", response = String.class)
    @DeleteMapping("{childrenID}")
    public ResponseEntity<String> deleteChildren(@PathVariable @ApiParam(value = "삭제할 아아의 childrenID", required = true) int childrenID) {
        logger.debug("deleteMember 호출");
        if(childrenService.deleteChildren(childrenID)) {
            return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
        }
        return new ResponseEntity<String>(FAIL, HttpStatus.NO_CONTENT);
    }

}
