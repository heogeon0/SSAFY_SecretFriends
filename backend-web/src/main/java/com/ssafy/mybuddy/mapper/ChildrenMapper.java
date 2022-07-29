package com.ssafy.mybuddy.mapper;

import com.ssafy.mybuddy.dto.ChildrenDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ChildrenMapper {
    int insertChildren(ChildrenDto childrenDto);

    List<ChildrenDto> retrieveChildren(int memberId);

    ChildrenDto selectChildren(int childrenId);

    int updateChildren(ChildrenDto childrenDto);

    int deleteChildren(int childrenId);
}
