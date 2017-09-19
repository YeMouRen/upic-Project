package com.upic.condition;

import com.upic.common.base.condition.BaseCondition;
import com.upic.enums.OperatorStatusEnum;

/**
 * Created by zhubuqing on 2017/9/6.
 */
public class OperatorCondition extends BaseCondition {
    private String jobNum; //工号

    private String username; //用户名

    private String email; //邮箱

    private OperatorStatusEnum status; //状态

    private String phone; //手机号

    private String idcard; //身份证

    private int type;

    public OperatorCondition() {
        super();
    }

    public OperatorCondition(String jobNum, String username, String email, OperatorStatusEnum status, String phone, String idcard, int type) {
        super();
        this.jobNum = jobNum;
        this.username = username;
        this.email = email;
        this.status = status;
        this.phone = phone;
        this.idcard = idcard;
        this.type = type;
    }

    public String getJobNum() {
        return jobNum;
    }

    public void setJobNum(String jobNum) {
        this.jobNum = jobNum;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public OperatorStatusEnum getStatus() {
        return status;
    }

    public void setStatus(OperatorStatusEnum status) {
        this.status = status;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getIdcard() {
        return idcard;
    }

    public void setIdcard(String idcard) {
        this.idcard = idcard;
    }

    public int getType() {
        return type;
    }

    public void setType(int type) {
        this.type = type;
    }
}