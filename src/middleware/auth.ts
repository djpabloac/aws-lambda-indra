import { APIGatewayAuthorizerResult, APIGatewayTokenAuthorizerEvent } from "aws-lambda";
import { config } from "../config";

const { auth } = config

enum EffectType {
    ALLOW = 'Allow',
    DENY = 'Deny'
}

export const handler = async (event: APIGatewayTokenAuthorizerEvent): Promise<APIGatewayAuthorizerResult> => {
    const authorization = event.authorizationToken;
    const methodArn = event.methodArn;

    const [, token] = authorization.split(' ')

    const validPermission = (): string => {
        if (!auth.tokenBearer) return EffectType.DENY

        return token === auth.tokenBearer ? EffectType.ALLOW : EffectType.DENY
    }

    const effect = validPermission()

    return {
        principalId: 'user',
        policyDocument: {
            Version: '2012-10-17',
            Statement: [
                {
                    Action: 'execute-api:Invoke',
                    Effect: effect,
                    Resource: methodArn,
                },
            ],
        },
    };
};