package com.ssafy.mybuddy.mapper;

import com.ssafy.mybuddy.dto.MycharacterDto;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface MyCharactermapper {

    public MycharacterDto selectMyCharacter(int childrenID);

    public int insertMyCharacter(MycharacterDto mycharacterDto);

    public int updateMyCharacter(MycharacterDto mycharacterDto);

    public int deleteMyCharacter(int characterID);
}
