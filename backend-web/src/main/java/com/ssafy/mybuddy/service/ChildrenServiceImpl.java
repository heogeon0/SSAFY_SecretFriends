package com.ssafy.mybuddy.service;

import com.ssafy.mybuddy.dto.ChildrenDto;
import com.ssafy.mybuddy.mapper.ChildrenMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service

public class ChildrenServiceImpl implements ChildrenService{

    @Autowired
    private ChildrenMapper childrenMapper;

    @Override
    public boolean insertChildren(ChildrenDto childrenDto) {
        return childrenMapper.insertChildren(childrenDto) == 1;
    }

    @Override
    public List<ChildrenDto> retrieveChildren(int memberID) {
        return childrenMapper.retrieveChildren(memberID);
    }

    @Override
    public ChildrenDto selectChildren(int childrenID) {
        return childrenMapper.selectChildren(childrenID);
    }

    @Override
    public boolean updateChildren(ChildrenDto childrenDto) {
        return childrenMapper.updateChildren(childrenDto) == 1;
    }

    @Override
    public boolean deleteChildren(int childrenID) {
        return childrenMapper.deleteChildren(childrenID) == 1;
    }

    @Override
    public void updateVisitCount(int childrenID) {
        childrenMapper.updateVisitCount(childrenID);
    }
}
