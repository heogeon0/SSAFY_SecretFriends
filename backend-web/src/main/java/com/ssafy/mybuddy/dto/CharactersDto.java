package com.ssafy.mybuddy.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;


@Getter
@Setter
@ToString
@ApiModel(value="CharactersDto : 시스템에 등록된 캐릭터", description = "아이가 선택할 수 있는 캐릭터들의 정보")
public class CharactersDto {


    @ApiModelProperty(value="캐릭터 고유번호")
    private int characterID;

    @ApiModelProperty(value="캐릭터 컨셉")
    private String concept;

    @ApiModelProperty(value="캐릭터 상세정보")
    private String description;

    @ApiModelProperty(value="캐릭터 이름")
    private String name;
}
