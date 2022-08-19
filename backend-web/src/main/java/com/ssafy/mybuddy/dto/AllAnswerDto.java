package com.ssafy.mybuddy.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@ApiModel(value="AllAnswerDto : 답변정보", description = "답변의 상세 정보를 나타낸다.")
public class AllAnswerDto {
    @ApiModelProperty(value="답변 번호")
    private int answerID;
    @ApiModelProperty(value="답변 내용")
    private List<String> content;
    @ApiModelProperty(value="아이 번호")
    private int childrenID;
    @ApiModelProperty(value="질문 번호")
    private int questionID;
    @ApiModelProperty(value = "질문 사용 여부")
    private Boolean isUsed;
    @ApiModelProperty(value = "질문이 생성된 시간")
    private String createdAt;

}
