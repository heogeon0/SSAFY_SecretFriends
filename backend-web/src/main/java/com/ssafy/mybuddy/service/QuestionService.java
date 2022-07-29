package com.ssafy.mybuddy.service;

import com.ssafy.mybuddy.dto.QuestionDto;

import java.util.List;

public interface QuestionService {
    public boolean registQuestion(QuestionDto dto) throws Exception;
    public boolean updateQuestion(QuestionDto dto) throws Exception;
    public boolean deleteQuestion(int id) throws Exception;
    public QuestionDto detailQuestion(int id) throws Exception;
    public List<QuestionDto> allQuestions() throws Exception;
}
