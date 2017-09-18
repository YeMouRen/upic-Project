package com.upic.dto;

import com.upic.common.base.dto.BaseInfo;
import com.upic.enums.OperateLogStatusEnum;
import com.upic.enums.OperateLogTypeEnum;

/**
 * Created by zhubuqing on 2017/9/5.
 */
public class OperateLogInfo extends BaseInfo {
    private String operator; //操作员

    private String operatorNum; //工号

    private String ipAddress; //IP

    private String content; //操作内容

    private OperateLogTypeEnum type;

    private OperateLogStatusEnum status;

    public OperateLogInfo() {
        super();
    }

    public OperateLogInfo(String operator, String operatorNum, String ipAddress, String content, OperateLogTypeEnum type, OperateLogStatusEnum status) {
        this.operator = operator;
        this.operatorNum = operatorNum;
        this.ipAddress = ipAddress;
        this.content = content;
        this.type = type;
        this.status = status;
    }

    public String getOperator() {
        return operator;
    }

    public void setOperator(String operator) {
        this.operator = operator;
    }

    public String getOperatorNum() {
        return operatorNum;
    }

    public void setOperatorNum(String operatorNum) {
        this.operatorNum = operatorNum;
    }

    public String getIpAddress() {
        return ipAddress;
    }

    public void setIpAddress(String ipAddress) {
        this.ipAddress = ipAddress;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public OperateLogTypeEnum getType() {
        return type;
    }

    public void setType(OperateLogTypeEnum type) {
        this.type = type;
    }

    public OperateLogStatusEnum getStatus() {
        return status;
    }

    public void setStatus(OperateLogStatusEnum status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "OperateLogInfo{" +
                "operator='" + operator + '\'' +
                ", operatorNum='" + operatorNum + '\'' +
                ", ipAddress='" + ipAddress + '\'' +
                ", content='" + content + '\'' +
                ", type=" + type +
                ", status=" + status +
                '}';
    }
}
