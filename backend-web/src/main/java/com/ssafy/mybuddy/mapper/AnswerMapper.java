package com.ssafy.mybuddy.mapper;

import com.ssafy.mybuddy.dto.AnswerDto;
import org.apache.ibatis.annotations.Mapper;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

@Mapper
public interface AnswerMapper {
    public int registAnswer(AnswerDto dto) throws SQLException;
    public int updateAnswer(AnswerDto dto) throws SQLException;
    public int deleteAnswer(int id) throws SQLException;
    public List<AnswerDto> detailAnswer(Map<String, Integer> ids) throws SQLException;
    public List<AnswerDto> allAnswers(int id) throws SQLException;

    int updateAnswerTrue(int answerID) throws SQLException;

    int updateAnswerFalse(int answerID) throws SQLException;
}
