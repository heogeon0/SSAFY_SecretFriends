package com.ssafy.mybuddy.service;

import com.ssafy.mybuddy.dto.AnswerDto;

import java.util.List;
import java.util.Map;

public interface AnswerService {
    public boolean registAnswer(AnswerDto dto) throws Exception;
    public boolean updateAnswer(AnswerDto dto) throws Exception;
    public boolean deleteAnswer(int id) throws Exception;
    public List<AnswerDto> detailAnswer(Map<String, Integer> ids) throws Exception;
    public List<AnswerDto> allAnswers(int id) throws Exception;

    boolean updateAnswerTrue(int answerID) throws Exception;

    boolean updateAnswerFalse(int answerID) throws Exception;

}
