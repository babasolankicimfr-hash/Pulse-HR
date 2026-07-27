package com.pulsehr.aspect;

import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Aspect
@Component
@Slf4j
public class SaaSLoggingAspect {

    @Pointcut("within(com.pulsehr.service..*) || within(com.pulsehr.controller..*)")
    public void saasApplicationPackagePointcut() {
    }

    @Around("saasApplicationPackagePointcut()")
    public Object logAround(ProceedingJoinPoint joinPoint) throws Throwable {
        String methodName = joinPoint.getSignature().getDeclaringTypeName() + "." + joinPoint.getSignature().getName();
        if (log.isDebugEnabled()) {
            log.debug("ENTRY {}() with argument[s] = {}", methodName, Arrays.toString(joinPoint.getArgs()));
        }
        long start = System.currentTimeMillis();
        try {
            Object result = joinPoint.proceed();
            long duration = System.currentTimeMillis() - start;
            if (log.isDebugEnabled()) {
                log.debug("EXIT {}() with result = {}, Execution Time: {} ms", methodName, result, duration);
            } else {
                log.info("Execution of {} took {} ms", methodName, duration);
            }
            return result;
        } catch (IllegalArgumentException e) {
            log.error("Illegal argument: {} in {}()", Arrays.toString(joinPoint.getArgs()), methodName);
            throw e;
        }
    }
}
