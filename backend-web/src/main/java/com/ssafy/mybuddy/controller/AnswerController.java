package com.ssafy.mybuddy.controller;

import com.ssafy.mybuddy.dto.AnswerDto;
import com.ssafy.mybuddy.service.AnswerService;
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
import java.util.Map;

@RestController
@RequestMapping("/answer")
@CrossOrigin("*")
public class AnswerController {

    public static final Logger logger = LoggerFactory.getLogger(AnswerController.class);
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    @Autowired
    private AnswerService answerService;

    @ApiOperation(value="답변 등록", notes="답변을 등록한다. 성공 여부에 따라 'success' 또는 'fail'을 반환한다.", response = String.class)
    @PostMapping
    public ResponseEntity<String> registAnswer(@RequestBody @ApiParam(value="답변 등록 시 필요한 정보(답변 내용, 아이 번호, 질문 번호)", required = true) AnswerDto answerDto) throws Exception{
        logger.debug("registAnswer - 호출");
        if(answerService.registAnswer(answerDto)) {
            return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
        }
        return new ResponseEntity<String>(FAIL, HttpStatus.NO_CONTENT);
    }

    @ApiOperation(value="아이별 딥변 전체 조회", notes="아이별로 답변 전체를 반환한다(답변이 생성된 순서대로 정렬).", response = List.class)
    @GetMapping("{childrenID}")
    public ResponseEntity<List<AnswerDto>> allAnswers(@PathVariable @ApiParam(value = "조회할 아이 번호", required = true)int childrenID) throws Exception {
        logger.debug("allAnswers - 호출");
        return new ResponseEntity<List<AnswerDto>>(answerService.allAnswers(childrenID), HttpStatus.OK);
    }

    @ApiOperation(value="아이별 질문별 답변 조회", notes="아이별 질문별로 답변 반환한다.", response = List.class)
    @GetMapping("{childrenID}/{questionID}")
    public ResponseEntity<List<AnswerDto>> detailAnswer(@PathVariable @ApiParam(value = "조회할 아이 번호", required = true) int childrenID, @PathVariable @ApiParam(value = "조회할 질문 번호", required = true) int questionID) throws Exception {
        logger.debug("detailAnswer - 호출");
        Map<String, Integer> map = new HashMap<String, Integer>();
        map.put("childrenID", childrenID);
        map.put("questionID", questionID);
        return new ResponseEntity<List<AnswerDto>>(answerService.detailAnswer(map), HttpStatus.OK);
    }

    @ApiOperation(value="답변 수정", notes="답변 내용을 수정한다.", response = String.class)
    @PutMapping("{answerID}")
    public ResponseEntity<String> updateAnswer(@RequestBody @ApiParam(value = "수정할 답변 정보를 입력받아 수정한다. (답변 번호, 답변 내용, 아이 번호, 질문 번호)", required = true) AnswerDto answerDto) throws Exception {
        logger.debug("updateAnswer - 호출");
        logger.debug("" + answerDto);

        if (answerService.updateAnswer(answerDto)) {
            return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
        }
        return new ResponseEntity<String>(FAIL, HttpStatus.NO_CONTENT);
    }

    @ApiOperation(value="답변 삭제", notes="answerID에 해당하는 답변을 삭제한다.", response = String.class)
    @DeleteMapping("{answerID}")
    public ResponseEntity<String> deleteAnswer(@PathVariable @ApiParam(value = "삭제할 답변의 answerID", required = true)int answerID) throws Exception {
        logger.debug("deleteAnswer - 호출");
        if (answerService.deleteAnswer(answerID)) {
            return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
        }
        return new ResponseEntity<String>(FAIL, HttpStatus.NO_CONTENT);
    }
}
