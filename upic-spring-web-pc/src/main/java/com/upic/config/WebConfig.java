package com.upic.config;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.boot.web.servlet.ServletListenerRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.CharacterEncodingFilter;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

//import com.neusoft.education.tp.sso.client.filter.DefaultCASFilter;
import com.upic.interceptor.WebHandlerInteceptor;
import com.upic.listener.StartListener;

@Component
public class WebConfig extends WebMvcConfigurerAdapter {

	@Autowired
	private WebHandlerInteceptor handeler;

	@Override
	public void addInterceptors(InterceptorRegistry registry) {
		registry.addInterceptor(handeler);
		super.addInterceptors(registry);
	}

//	/**
//	 * 学校CAS认证过滤器
//	 * @return
//	 */
//	@Bean
//	public FilterRegistrationBean cas() {
//		FilterRegistrationBean filter = new FilterRegistrationBean();
//		DefaultCASFilter cf = new DefaultCASFilter();
//		filter.setFilter(cf);
//		List<String> urls = new ArrayList<>();
//		urls.add("/cas");
//		filter.setUrlPatterns(urls);
//		return filter;
//	}

	@Bean
	public ServletListenerRegistrationBean servletListenerRegistrationBean() {
		ServletListenerRegistrationBean servletListenerRegistrationBean = new ServletListenerRegistrationBean();
		servletListenerRegistrationBean.setListener(new StartListener());
		return servletListenerRegistrationBean;
	}
//	@Override
//	public void addResourceHandlers(ResourceHandlerRegistry registry) {
//	    registry.addResourceHandler("/metroWeb/css/**","/metroWeb/js/**","/metroWeb/img/**","/metroWeb/others/**")
//	            .addResourceLocations("classpath:/metroWeb/");
//	}
}
