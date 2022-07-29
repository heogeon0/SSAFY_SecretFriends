package com.ssafy.mybuddy.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@ApiModel(value="MycharacterDto : 아이가 선택한 캐릭터", description = "아이가 선택한 캐릭터의 정보")
public class MycharacterDto {

    @ApiModelProperty(value = "나의캐릭터고유번호")
    private int myCharacterId;

    @ApiModelProperty(value = "캐릭터닉네임")
    private String nickname;

    @ApiModelProperty(value = "캐릭터고유번호")
    private int characterId;

    @ApiModelProperty(value = "아이의 고유번호")
    private int childrenId;
}
