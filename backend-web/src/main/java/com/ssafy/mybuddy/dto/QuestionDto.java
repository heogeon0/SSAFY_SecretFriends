package com.ssafy.mybuddy.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@ApiModel(value="QuestionDto : 질문정보", description = "질문의 상세 정보를 나타낸다.")
public class QuestionDto {
    @ApiModelProperty(value="질문 번호")
    private int questionID;
    @ApiModelProperty(value="질문 내용")
    private String content;
}
