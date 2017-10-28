package com.upic.social.github.api.impl;

import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.List;

import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.social.oauth2.AbstractOAuth2ApiBinding;
import org.springframework.social.oauth2.TokenStrategy;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.upic.social.github.api.WeiShao;
import com.upic.social.github.api.WeiShaoProfile;

public class WeiShaoTemplate extends AbstractOAuth2ApiBinding implements WeiShao {
	
	/**
	 * 
	 */
	private ObjectMapper objectMapper = new ObjectMapper();
	/**
	 * 获取用户信息的url
	 */
	private static final String URL_GET_USER_INFO = "https://api.weishao.com.cn/api/v2/index.php/user/authUser";
	/**
	 * @param accessToken
	 */
	public WeiShaoTemplate(String accessToken) {
		super(accessToken, TokenStrategy.ACCESS_TOKEN_PARAMETER);
	}
	
	/**
	 * 默认注册的StringHttpMessageConverter字符集为ISO-8859-1，而微信返回的是UTF-8的，所以覆盖了原来的方法。
	 */
	protected List<HttpMessageConverter<?>> getMessageConverters() {
		List<HttpMessageConverter<?>> messageConverters = new ArrayList<HttpMessageConverter<?>>();
		messageConverters.add(new StringHttpMessageConverter(Charset.forName("UTF-8")));
		messageConverters.add(getFormMessageConverter());
		messageConverters.add(getJsonMessageConverter());
		messageConverters.add(getByteArrayMessageConverter());
		return messageConverters;
	}

	/**
	 * 获取微信用户信息。
	 */
	@Override
	public WeiShaoProfile getWeiShaoProfile() {
		String url = URL_GET_USER_INFO;
		String response = getRestTemplate().getForObject(url, String.class);
		WeiShaoProfile profile = null;
		try {
			profile = objectMapper.readValue(response, WeiShaoProfile.class);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return profile;
	}
}