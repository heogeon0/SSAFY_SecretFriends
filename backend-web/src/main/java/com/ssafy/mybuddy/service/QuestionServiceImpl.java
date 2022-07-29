package com.ssafy.mybuddy.service;

import com.ssafy.mybuddy.dto.QuestionDto;
import com.ssafy.mybuddy.mapper.QuestionMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuestionServiceImpl implements QuestionService{
    private QuestionMapper questionMapper;

    @Autowired
    public QuestionServiceImpl(QuestionMapper questionMapper){
        this.questionMapper = questionMapper;
    }

    @Override
    public boolean registQuestion(QuestionDto dto) throws Exception {
        return questionMapper.registQuestion(dto) == 1;
    }

    @Override
    public boolean updateQuestion(QuestionDto dto) throws Exception {
        return questionMapper.updateQuestion(dto) == 1;
    }

    @Override
    public boolean deleteQuestion(int id) throws Exception {
        return questionMapper.deleteQuestion(id) == 1;
    }

    @Override
    public QuestionDto detailQuestion(int id) throws Exception {
        return questionMapper.detailQuestion(id);
    }

    @Override
    public List<QuestionDto> allQuestions() throws Exception {
        return questionMapper.allQuestions();
    }
}
