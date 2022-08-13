package com.ssafy.mybuddy.mapper;

import com.ssafy.mybuddy.dto.ChildrenDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ChildrenMapper {
    int insertChildren(ChildrenDto childrenDto);

    List<ChildrenDto> retrieveChildren(int memberID);

    ChildrenDto selectChildren(int childrenID);

    int updateChildren(ChildrenDto childrenDto);

    int deleteChildren(int childrenID);

    void updateVisitCount(int childrenID);
}
