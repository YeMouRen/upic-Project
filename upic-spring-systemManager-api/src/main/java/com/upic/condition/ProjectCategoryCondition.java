package com.upic.condition;

import com.upic.common.base.condition.BaseCondition;

/**
 * Created by zhubuqing on 2017/9/6.
 */
public class ProjectCategoryCondition extends BaseCondition {
    private String categoryName; //项目类别名

    private String subordinateSector; //所属部门

    private String subordinateSectorOtherName;

    public ProjectCategoryCondition() {
        super();
    }

    public ProjectCategoryCondition(String categoryName, String subordinateSector, String subordinateSectorOtherName) {
        this.categoryName = categoryName;
        this.subordinateSector = subordinateSector;
        this.subordinateSectorOtherName = subordinateSectorOtherName;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public String getSubordinateSector() {
        return subordinateSector;
    }

    public void setSubordinateSector(String subordinateSector) {
        this.subordinateSector = subordinateSector;
    }

    public String getSubordinateSectorOtherName() {
        return subordinateSectorOtherName;
    }

    public void setSubordinateSectorOtherName(String subordinateSectorOtherName) {
        this.subordinateSectorOtherName = subordinateSectorOtherName;
    }
}
