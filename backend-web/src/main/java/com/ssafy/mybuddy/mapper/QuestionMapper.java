package com.ssafy.mybuddy.mapper;

import com.ssafy.mybuddy.dto.QuestionDto;
import org.apache.ibatis.annotations.Mapper;

import java.sql.SQLException;
import java.util.List;

@Mapper
public interface QuestionMapper {
    public int registQuestion(QuestionDto dto) throws SQLException;
    public int updateQuestion(QuestionDto dto) throws SQLException;
    public int deleteQuestion(int id) throws SQLException;
    public QuestionDto detailQuestion(int id) throws SQLException;
    public List<QuestionDto> allQuestions() throws SQLException;
}
