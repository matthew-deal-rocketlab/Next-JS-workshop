import {
  Maybe,
  MutationAuthLoginArgs,
  MutationAuthSignupArgs,
  Resolvers,
  ResolversTypes,
  Result,
} from './resolver-types.gen'

import { EMPTY_RESOLVER_CONTEXT } from '../constants'

import { getVersion } from '../resolvers/utils'
import {
  // authForgotPassword as authForgotPasswordResolver,
  authLogin as authLoginResolver,
  // authLogout as authLogoutResolver,
  // authRefresh as authRefreshResolver,
  // authResetPassword as authResetPasswordResolver,
  authSignup as authSignupResolver,
  // authVerify as authVerifyResolver,
} from '../resolvers/auth'

// import { userRead, userUpdate } from '../resolvers/user'
// import { crudCreate, crudDelete, crudRead, crudUpdate } from '../resolvers/crud'

// Return objects
/*
type Result = {
  result: string
}

type AuthSignupInput = {
  input: {
    email: string
    pass: string
    firstname: string
    lastname: string
  }
}

type AuthLoginInput = {
  input: {
    email: string
    pass: string
  }
}

type AuthLogin = {
  firstname: string
  token: string
  refreshToken: string
}
*/

// Queries
const version = async () => {
  const rc: ResolverContext = EMPTY_RESOLVER_CONTEXT
  return (await getVersion({}, rc)) as Maybe<Result>
}

// Mutations
const authSignup = async (parent: unknown, args: MutationAuthSignupArgs, context: ResolverContext) => {
  const result = await authSignupResolver(args.input as JsonQLInput, context)
  if (result.error) throw Error(result.error)
  return result.result as Maybe<Result>
}

const authLogin = async (parent: unknown, args: MutationAuthLoginArgs, context: ResolverContext) => {
  const result = await authLoginResolver(args.input as JsonQLInput, context)
  if (result.error) throw Error(result.error)
  return result.result as Maybe<ResolversTypes['AuthLogin']>
}

export const resolverMap: Resolvers<ResolverContext> = {
  Query: {
    version,
  },
  Mutation: {
    authSignup,
    authLogin,
  },
}
