package com.ssafy.mybuddy.controller;

import com.ssafy.mybuddy.dto.ChildrenDto;
import com.ssafy.mybuddy.dto.QuestionDto;
import com.ssafy.mybuddy.service.QuestionService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/question")
@CrossOrigin("*")
public class QuestionController {

    public static final Logger logger = LoggerFactory.getLogger(QuestionController.class);
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    @Autowired
    private QuestionService questionService;

    @ApiOperation(value="질문 등록", notes="질문을 등록한다. 성공 여부에 따라 'success' 또는 'fail'을 반환한다.", response = String.class)
    @PostMapping
    public ResponseEntity<String> registQuestion(@RequestBody @ApiParam(value="질문 등록 시 필요한 정보(질문 내용)", required = true) QuestionDto questionDto) throws Exception{
        logger.debug("registQuestion - 호출");
        if(questionService.registQuestion(questionDto)) {
            return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
        }
        return new ResponseEntity<String>(FAIL, HttpStatus.NO_CONTENT);
    }

    @ApiOperation(value="질문 전체 조회", notes="질문 전체를 반환한다.", response = List.class)
    @GetMapping
    public ResponseEntity<List<QuestionDto>> allQuestions() throws Exception {
        logger.debug("allQuestions - 호출");
        return new ResponseEntity<List<QuestionDto>>(questionService.allQuestions(), HttpStatus.OK);
    }

    @ApiOperation(value="특정 질문 조회", notes="questionID에 해당하는 아이의 정보를 반환한다.", response = QuestionDto.class)
    @GetMapping("{questionID}")
    public ResponseEntity<QuestionDto> detailQuestion(@PathVariable @ApiParam(value = "조회할 질문 번호", required = true)int questionID) throws Exception {
        logger.debug("detailQuestion - 호출");
        return new ResponseEntity<QuestionDto>(questionService.detailQuestion(questionID), HttpStatus.OK);
    }

    @ApiOperation(value="질문 수정", notes="질문 내용을 수정한다.", response = String.class)
    @PutMapping("{questionID}")
    public ResponseEntity<String> updateQuestion(@RequestBody @ApiParam(value = "수정할 질문 정보를 입력받아 수정한다. (질문 번호, 질문 내용)", required = true) QuestionDto questionDto) throws Exception {
        logger.debug("updateQuestion - 호출");
        logger.debug("" + questionDto);

        if (questionService.updateQuestion(questionDto)) {
            return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
        }
        return new ResponseEntity<String>(FAIL, HttpStatus.NO_CONTENT);
    }

    @ApiOperation(value="질문 삭제", notes="questionID에 해당하는 질문을 삭제한다.", response = String.class)
    @DeleteMapping("{questionID}")
    public ResponseEntity<String> deleteQuestion(@PathVariable @ApiParam(value = "삭제할 질문의 questionID", required = true) int questionID) throws Exception {
        logger.debug("deleteQuestion - 호출");
        if (questionService.deleteQuestion(questionID)) {
            return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
        }
        return new ResponseEntity<String>(FAIL, HttpStatus.NO_CONTENT);
    }

}
