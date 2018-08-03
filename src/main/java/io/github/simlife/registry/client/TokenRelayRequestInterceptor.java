package io.github.simlife.registry.client;

import feign.RequestInterceptor;
import feign.RequestTemplate;
import io.github.simlife.registry.security.oauth2.AuthorizationHeaderUtil;

public class TokenRelayRequestInterceptor implements RequestInterceptor {

    public static final String AUTHORIZATION = "Authorization";

    @Override
    public void apply(RequestTemplate template) {
        template.header(AUTHORIZATION, AuthorizationHeaderUtil.getAuthorizationHeader());
    }
}
