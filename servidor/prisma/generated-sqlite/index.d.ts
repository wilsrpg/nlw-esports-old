
/**
 * Client
**/

import * as runtime from './runtime/library';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions

export type PrismaPromise<T> = $Public.PrismaPromise<T>


export type JogosPayload<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
  objects: {
    anuncios: AnunciosPayload<ExtArgs>[]
  }
  scalars: $Extensions.GetResult<{
    id: string
    nome: string
    url: string
    nomeUrl: string
    urlImagem: string
  }, ExtArgs["result"]["jogos"]>
  composites: {}
}

/**
 * Model Jogos
 * 
 */
export type Jogos = runtime.Types.DefaultSelection<JogosPayload>
export type AnunciosPayload<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
  objects: {
    jogo: JogosPayload<ExtArgs>
  }
  scalars: $Extensions.GetResult<{
    id: string
    jogoId: string
    nomeDoUsuario: string
    tempoDeJogoEmAnos: number
    discord: string
    diasQueJoga: string
    deHora: number
    ateHora: number
    usaChatDeVoz: boolean
    dataDeCriacao: Date
  }, ExtArgs["result"]["anuncios"]>
  composites: {}
}

/**
 * Model Anuncios
 * 
 */
export type Anuncios = runtime.Types.DefaultSelection<AnunciosPayload>

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Jogos
 * const jogos = await prisma.jogos.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  T extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof T ? T['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<T['log']> : never : never,
  GlobalReject extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined = 'rejectOnNotFound' extends keyof T
    ? T['rejectOnNotFound']
    : false,
  ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Jogos
   * const jogos = await prisma.jogos.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<T, Prisma.PrismaClientOptions>);
  $on<V extends (U | 'beforeExit')>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : V extends 'beforeExit' ? () => Promise<void> : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): Promise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): Promise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): Promise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => Promise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): Promise<R>


  $extends: $Extensions.ExtendsHook<'extends', Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.jogos`: Exposes CRUD operations for the **Jogos** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Jogos
    * const jogos = await prisma.jogos.findMany()
    * ```
    */
  get jogos(): Prisma.JogosDelegate<GlobalReject, ExtArgs>;

  /**
   * `prisma.anuncios`: Exposes CRUD operations for the **Anuncios** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Anuncios
    * const anuncios = await prisma.anuncios.findMany()
    * ```
    */
  get anuncios(): Prisma.AnunciosDelegate<GlobalReject, ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql

  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export type Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export type Args<T, F extends $Public.Operation> = $Public.Args<T, F>
  export type Payload<T, F extends $Public.Operation> = $Public.Payload<T, F>
  export type Result<T, A, F extends $Public.Operation> = $Public.Result<T, A, F>
  export type Exact<T, W> = $Public.Exact<T, W>

  /**
   * Prisma Client JS version: 4.16.0
   * Query Engine version: b20ead4d3ab9e78ac112966e242ded703f4a052c
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON object.
   * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from. 
   */
  export type JsonObject = {[Key in string]?: JsonValue}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON array.
   */
  export interface JsonArray extends Array<JsonValue> {}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches any valid JSON value.
   */
  export type JsonValue = string | number | boolean | JsonObject | JsonArray | null

  /**
   * Matches a JSON object.
   * Unlike `JsonObject`, this type allows undefined and read-only properties.
   */
  export type InputJsonObject = {readonly [Key in string]?: InputJsonValue | null}

  /**
   * Matches a JSON array.
   * Unlike `JsonArray`, readonly arrays are assignable to this type.
   */
  export interface InputJsonArray extends ReadonlyArray<InputJsonValue | null> {}

  /**
   * Matches any valid value that can be used as an input for operations like
   * create and update as the value of a JSON field. Unlike `JsonValue`, this
   * type allows read-only arrays and read-only object properties and disallows
   * `null` at the top level.
   *
   * `null` cannot be used as the value of a JSON field because its meaning
   * would be ambiguous. Use `Prisma.JsonNull` to store the JSON null value or
   * `Prisma.DbNull` to clear the JSON value and set the field to the database
   * NULL value instead.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-by-null-values
   */
  export type InputJsonValue = string | number | boolean | InputJsonObject | InputJsonArray

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }
  type HasSelect = {
    select: any
  }
  type HasInclude = {
    include: any
  }
  type CheckSelect<T, S, U> = T extends SelectAndInclude
    ? 'Please either choose `select` or `include`'
    : T extends HasSelect
    ? U
    : T extends HasInclude
    ? U
    : S

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => Promise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but with an array
   */
  type PickArray<T, K extends Array<keyof T>> = Prisma__Pick<T, TupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Jogos: 'Jogos',
    Anuncios: 'Anuncios'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }


  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.Args}, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs']>
  }

  export type TypeMap<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
      meta: {
        modelProps: 'jogos' | 'anuncios'
        txIsolationLevel: Prisma.TransactionIsolationLevel
      },
      model: {
      Jogos: {
        findUnique: {
          args: Prisma.JogosFindUniqueArgs<ExtArgs>,
          result: $Utils.OptionalFlat<Jogos>
          payload: JogosPayload<ExtArgs>
        }
        findUniqueOrThrow: {
          args: Prisma.JogosFindUniqueOrThrowArgs<ExtArgs>,
          result: $Utils.OptionalFlat<Jogos>
          payload: JogosPayload<ExtArgs>
        }
        findFirst: {
          args: Prisma.JogosFindFirstArgs<ExtArgs>,
          result: $Utils.OptionalFlat<Jogos>
          payload: JogosPayload<ExtArgs>
        }
        findFirstOrThrow: {
          args: Prisma.JogosFindFirstOrThrowArgs<ExtArgs>,
          result: $Utils.OptionalFlat<Jogos>
          payload: JogosPayload<ExtArgs>
        }
        findMany: {
          args: Prisma.JogosFindManyArgs<ExtArgs>,
          result: $Utils.OptionalFlat<Jogos>
          payload: JogosPayload<ExtArgs>
        }
        create: {
          args: Prisma.JogosCreateArgs<ExtArgs>,
          result: $Utils.OptionalFlat<Jogos>
          payload: JogosPayload<ExtArgs>
        }
        delete: {
          args: Prisma.JogosDeleteArgs<ExtArgs>,
          result: $Utils.OptionalFlat<Jogos>
          payload: JogosPayload<ExtArgs>
        }
        update: {
          args: Prisma.JogosUpdateArgs<ExtArgs>,
          result: $Utils.OptionalFlat<Jogos>
          payload: JogosPayload<ExtArgs>
        }
        deleteMany: {
          args: Prisma.JogosDeleteManyArgs<ExtArgs>,
          result: $Utils.OptionalFlat<Jogos>
          payload: JogosPayload<ExtArgs>
        }
        updateMany: {
          args: Prisma.JogosUpdateManyArgs<ExtArgs>,
          result: $Utils.OptionalFlat<Jogos>
          payload: JogosPayload<ExtArgs>
        }
        upsert: {
          args: Prisma.JogosUpsertArgs<ExtArgs>,
          result: $Utils.OptionalFlat<Jogos>
          payload: JogosPayload<ExtArgs>
        }
        aggregate: {
          args: Prisma.JogosAggregateArgs<ExtArgs>,
          result: $Utils.OptionalFlat<Jogos>
          payload: JogosPayload<ExtArgs>
        }
        groupBy: {
          args: Prisma.JogosGroupByArgs<ExtArgs>,
          result: $Utils.OptionalFlat<Jogos>
          payload: JogosPayload<ExtArgs>
        }
        count: {
          args: Prisma.JogosCountArgs<ExtArgs>,
          result: $Utils.OptionalFlat<Jogos>
          payload: JogosPayload<ExtArgs>
        }
      }
      Anuncios: {
        findUnique: {
          args: Prisma.AnunciosFindUniqueArgs<ExtArgs>,
          result: $Utils.OptionalFlat<Anuncios>
          payload: AnunciosPayload<ExtArgs>
        }
        findUniqueOrThrow: {
          args: Prisma.AnunciosFindUniqueOrThrowArgs<ExtArgs>,
          result: $Utils.OptionalFlat<Anuncios>
          payload: AnunciosPayload<ExtArgs>
        }
        findFirst: {
          args: Prisma.AnunciosFindFirstArgs<ExtArgs>,
          result: $Utils.OptionalFlat<Anuncios>
          payload: AnunciosPayload<ExtArgs>
        }
        findFirstOrThrow: {
          args: Prisma.AnunciosFindFirstOrThrowArgs<ExtArgs>,
          result: $Utils.OptionalFlat<Anuncios>
          payload: AnunciosPayload<ExtArgs>
        }
        findMany: {
          args: Prisma.AnunciosFindManyArgs<ExtArgs>,
          result: $Utils.OptionalFlat<Anuncios>
          payload: AnunciosPayload<ExtArgs>
        }
        create: {
          args: Prisma.AnunciosCreateArgs<ExtArgs>,
          result: $Utils.OptionalFlat<Anuncios>
          payload: AnunciosPayload<ExtArgs>
        }
        delete: {
          args: Prisma.AnunciosDeleteArgs<ExtArgs>,
          result: $Utils.OptionalFlat<Anuncios>
          payload: AnunciosPayload<ExtArgs>
        }
        update: {
          args: Prisma.AnunciosUpdateArgs<ExtArgs>,
          result: $Utils.OptionalFlat<Anuncios>
          payload: AnunciosPayload<ExtArgs>
        }
        deleteMany: {
          args: Prisma.AnunciosDeleteManyArgs<ExtArgs>,
          result: $Utils.OptionalFlat<Anuncios>
          payload: AnunciosPayload<ExtArgs>
        }
        updateMany: {
          args: Prisma.AnunciosUpdateManyArgs<ExtArgs>,
          result: $Utils.OptionalFlat<Anuncios>
          payload: AnunciosPayload<ExtArgs>
        }
        upsert: {
          args: Prisma.AnunciosUpsertArgs<ExtArgs>,
          result: $Utils.OptionalFlat<Anuncios>
          payload: AnunciosPayload<ExtArgs>
        }
        aggregate: {
          args: Prisma.AnunciosAggregateArgs<ExtArgs>,
          result: $Utils.OptionalFlat<Anuncios>
          payload: AnunciosPayload<ExtArgs>
        }
        groupBy: {
          args: Prisma.AnunciosGroupByArgs<ExtArgs>,
          result: $Utils.OptionalFlat<Anuncios>
          payload: AnunciosPayload<ExtArgs>
        }
        count: {
          args: Prisma.AnunciosCountArgs<ExtArgs>,
          result: $Utils.OptionalFlat<Anuncios>
          payload: AnunciosPayload<ExtArgs>
        }
      }
    }
  } & {
    other: {
      $executeRawUnsafe: {
        args: [query: string, ...values: any[]],
        result: any
        payload: any
      }
      $executeRaw: {
        args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
        result: any
        payload: any
      }
      $queryRawUnsafe: {
        args: [query: string, ...values: any[]],
        result: any
        payload: any
      }
      $queryRaw: {
        args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
        result: any
        payload: any
      }
    }
  }
    export const defineExtension: $Extensions.ExtendsHook<'define', Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type RejectOnNotFound = boolean | ((error: Error) => Error)
  export type RejectPerModel = { [P in ModelName]?: RejectOnNotFound }
  export type RejectPerOperation =  { [P in "findUnique" | "findFirst"]?: RejectPerModel | RejectOnNotFound } 
  type IsReject<T> = T extends true ? True : T extends (err: Error) => Error ? True : False
  export type HasReject<
    GlobalRejectSettings extends Prisma.PrismaClientOptions['rejectOnNotFound'],
    LocalRejectSettings,
    Action extends PrismaAction,
    Model extends ModelName
  > = LocalRejectSettings extends RejectOnNotFound
    ? IsReject<LocalRejectSettings>
    : GlobalRejectSettings extends RejectPerOperation
    ? Action extends keyof GlobalRejectSettings
      ? GlobalRejectSettings[Action] extends RejectOnNotFound
        ? IsReject<GlobalRejectSettings[Action]>
        : GlobalRejectSettings[Action] extends RejectPerModel
        ? Model extends keyof GlobalRejectSettings[Action]
          ? IsReject<GlobalRejectSettings[Action][Model]>
          : False
        : False
      : False
    : IsReject<GlobalRejectSettings>
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'

  export interface PrismaClientOptions {
    /**
     * Configure findUnique/findFirst to throw an error if the query returns null. 
     * @deprecated since 4.0.0. Use `findUniqueOrThrow`/`findFirstOrThrow` methods instead.
     * @example
     * ```
     * // Reject on both findUnique/findFirst
     * rejectOnNotFound: true
     * // Reject only on findFirst with a custom error
     * rejectOnNotFound: { findFirst: (err) => new Error("Custom Error")}
     * // Reject on user.findUnique with a custom error
     * rejectOnNotFound: { findUnique: {User: (err) => new Error("User not found")}}
     * ```
     */
    rejectOnNotFound?: RejectOnNotFound | RejectPerOperation
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources

    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat

    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: Array<LogLevel | LogDefinition>
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findMany'
    | 'findFirst'
    | 'create'
    | 'createMany'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => Promise<T>,
  ) => Promise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type JogosCountOutputType
   */


  export type JogosCountOutputType = {
    anuncios: number
  }

  export type JogosCountOutputTypeSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    anuncios?: boolean | JogosCountOutputTypeCountAnunciosArgs
  }

  // Custom InputTypes

  /**
   * JogosCountOutputType without action
   */
  export type JogosCountOutputTypeArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JogosCountOutputType
     */
    select?: JogosCountOutputTypeSelect<ExtArgs> | null
  }


  /**
   * JogosCountOutputType without action
   */
  export type JogosCountOutputTypeCountAnunciosArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: AnunciosWhereInput
  }



  /**
   * Models
   */

  /**
   * Model Jogos
   */


  export type AggregateJogos = {
    _count: JogosCountAggregateOutputType | null
    _min: JogosMinAggregateOutputType | null
    _max: JogosMaxAggregateOutputType | null
  }

  export type JogosMinAggregateOutputType = {
    id: string | null
    nome: string | null
    url: string | null
    nomeUrl: string | null
    urlImagem: string | null
  }

  export type JogosMaxAggregateOutputType = {
    id: string | null
    nome: string | null
    url: string | null
    nomeUrl: string | null
    urlImagem: string | null
  }

  export type JogosCountAggregateOutputType = {
    id: number
    nome: number
    url: number
    nomeUrl: number
    urlImagem: number
    _all: number
  }


  export type JogosMinAggregateInputType = {
    id?: true
    nome?: true
    url?: true
    nomeUrl?: true
    urlImagem?: true
  }

  export type JogosMaxAggregateInputType = {
    id?: true
    nome?: true
    url?: true
    nomeUrl?: true
    urlImagem?: true
  }

  export type JogosCountAggregateInputType = {
    id?: true
    nome?: true
    url?: true
    nomeUrl?: true
    urlImagem?: true
    _all?: true
  }

  export type JogosAggregateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which Jogos to aggregate.
     */
    where?: JogosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Jogos to fetch.
     */
    orderBy?: Enumerable<JogosOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: JogosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Jogos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Jogos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Jogos
    **/
    _count?: true | JogosCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: JogosMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: JogosMaxAggregateInputType
  }

  export type GetJogosAggregateType<T extends JogosAggregateArgs> = {
        [P in keyof T & keyof AggregateJogos]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateJogos[P]>
      : GetScalarType<T[P], AggregateJogos[P]>
  }




  export type JogosGroupByArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: JogosWhereInput
    orderBy?: Enumerable<JogosOrderByWithAggregationInput>
    by: JogosScalarFieldEnum[]
    having?: JogosScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: JogosCountAggregateInputType | true
    _min?: JogosMinAggregateInputType
    _max?: JogosMaxAggregateInputType
  }


  export type JogosGroupByOutputType = {
    id: string
    nome: string
    url: string
    nomeUrl: string
    urlImagem: string
    _count: JogosCountAggregateOutputType | null
    _min: JogosMinAggregateOutputType | null
    _max: JogosMaxAggregateOutputType | null
  }

  type GetJogosGroupByPayload<T extends JogosGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<JogosGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof JogosGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], JogosGroupByOutputType[P]>
            : GetScalarType<T[P], JogosGroupByOutputType[P]>
        }
      >
    >


  export type JogosSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    url?: boolean
    nomeUrl?: boolean
    urlImagem?: boolean
    anuncios?: boolean | Jogos$anunciosArgs<ExtArgs>
    _count?: boolean | JogosCountOutputTypeArgs<ExtArgs>
  }, ExtArgs["result"]["jogos"]>

  export type JogosSelectScalar = {
    id?: boolean
    nome?: boolean
    url?: boolean
    nomeUrl?: boolean
    urlImagem?: boolean
  }

  export type JogosInclude<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    anuncios?: boolean | Jogos$anunciosArgs<ExtArgs>
    _count?: boolean | JogosCountOutputTypeArgs<ExtArgs>
  }


  type JogosGetPayload<S extends boolean | null | undefined | JogosArgs> = $Types.GetResult<JogosPayload, S>

  type JogosCountArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = 
    Omit<JogosFindManyArgs, 'select' | 'include'> & {
      select?: JogosCountAggregateInputType | true
    }

  export interface JogosDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Jogos'], meta: { name: 'Jogos' } }
    /**
     * Find zero or one Jogos that matches the filter.
     * @param {JogosFindUniqueArgs} args - Arguments to find a Jogos
     * @example
     * // Get one Jogos
     * const jogos = await prisma.jogos.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends JogosFindUniqueArgs<ExtArgs>, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, JogosFindUniqueArgs<ExtArgs>>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Jogos'> extends True ? Prisma__JogosClient<$Types.GetResult<JogosPayload<ExtArgs>, T, 'findUnique', never>, never, ExtArgs> : Prisma__JogosClient<$Types.GetResult<JogosPayload<ExtArgs>, T, 'findUnique', never> | null, null, ExtArgs>

    /**
     * Find one Jogos that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {JogosFindUniqueOrThrowArgs} args - Arguments to find a Jogos
     * @example
     * // Get one Jogos
     * const jogos = await prisma.jogos.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends JogosFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, JogosFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__JogosClient<$Types.GetResult<JogosPayload<ExtArgs>, T, 'findUniqueOrThrow', never>, never, ExtArgs>

    /**
     * Find the first Jogos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JogosFindFirstArgs} args - Arguments to find a Jogos
     * @example
     * // Get one Jogos
     * const jogos = await prisma.jogos.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends JogosFindFirstArgs<ExtArgs>, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, JogosFindFirstArgs<ExtArgs>>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Jogos'> extends True ? Prisma__JogosClient<$Types.GetResult<JogosPayload<ExtArgs>, T, 'findFirst', never>, never, ExtArgs> : Prisma__JogosClient<$Types.GetResult<JogosPayload<ExtArgs>, T, 'findFirst', never> | null, null, ExtArgs>

    /**
     * Find the first Jogos that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JogosFindFirstOrThrowArgs} args - Arguments to find a Jogos
     * @example
     * // Get one Jogos
     * const jogos = await prisma.jogos.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends JogosFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, JogosFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__JogosClient<$Types.GetResult<JogosPayload<ExtArgs>, T, 'findFirstOrThrow', never>, never, ExtArgs>

    /**
     * Find zero or more Jogos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JogosFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Jogos
     * const jogos = await prisma.jogos.findMany()
     * 
     * // Get first 10 Jogos
     * const jogos = await prisma.jogos.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const jogosWithIdOnly = await prisma.jogos.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends JogosFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, JogosFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Types.GetResult<JogosPayload<ExtArgs>, T, 'findMany', never>>

    /**
     * Create a Jogos.
     * @param {JogosCreateArgs} args - Arguments to create a Jogos.
     * @example
     * // Create one Jogos
     * const Jogos = await prisma.jogos.create({
     *   data: {
     *     // ... data to create a Jogos
     *   }
     * })
     * 
    **/
    create<T extends JogosCreateArgs<ExtArgs>>(
      args: SelectSubset<T, JogosCreateArgs<ExtArgs>>
    ): Prisma__JogosClient<$Types.GetResult<JogosPayload<ExtArgs>, T, 'create', never>, never, ExtArgs>

    /**
     * Delete a Jogos.
     * @param {JogosDeleteArgs} args - Arguments to delete one Jogos.
     * @example
     * // Delete one Jogos
     * const Jogos = await prisma.jogos.delete({
     *   where: {
     *     // ... filter to delete one Jogos
     *   }
     * })
     * 
    **/
    delete<T extends JogosDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, JogosDeleteArgs<ExtArgs>>
    ): Prisma__JogosClient<$Types.GetResult<JogosPayload<ExtArgs>, T, 'delete', never>, never, ExtArgs>

    /**
     * Update one Jogos.
     * @param {JogosUpdateArgs} args - Arguments to update one Jogos.
     * @example
     * // Update one Jogos
     * const jogos = await prisma.jogos.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends JogosUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, JogosUpdateArgs<ExtArgs>>
    ): Prisma__JogosClient<$Types.GetResult<JogosPayload<ExtArgs>, T, 'update', never>, never, ExtArgs>

    /**
     * Delete zero or more Jogos.
     * @param {JogosDeleteManyArgs} args - Arguments to filter Jogos to delete.
     * @example
     * // Delete a few Jogos
     * const { count } = await prisma.jogos.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends JogosDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, JogosDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Jogos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JogosUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Jogos
     * const jogos = await prisma.jogos.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends JogosUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, JogosUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Jogos.
     * @param {JogosUpsertArgs} args - Arguments to update or create a Jogos.
     * @example
     * // Update or create a Jogos
     * const jogos = await prisma.jogos.upsert({
     *   create: {
     *     // ... data to create a Jogos
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Jogos we want to update
     *   }
     * })
    **/
    upsert<T extends JogosUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, JogosUpsertArgs<ExtArgs>>
    ): Prisma__JogosClient<$Types.GetResult<JogosPayload<ExtArgs>, T, 'upsert', never>, never, ExtArgs>

    /**
     * Count the number of Jogos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JogosCountArgs} args - Arguments to filter Jogos to count.
     * @example
     * // Count the number of Jogos
     * const count = await prisma.jogos.count({
     *   where: {
     *     // ... the filter for the Jogos we want to count
     *   }
     * })
    **/
    count<T extends JogosCountArgs>(
      args?: Subset<T, JogosCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], JogosCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Jogos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JogosAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends JogosAggregateArgs>(args: Subset<T, JogosAggregateArgs>): Prisma.PrismaPromise<GetJogosAggregateType<T>>

    /**
     * Group by Jogos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JogosGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends JogosGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: JogosGroupByArgs['orderBy'] }
        : { orderBy?: JogosGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, JogosGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetJogosGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Jogos.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__JogosClient<T, Null = never, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);

    anuncios<T extends Jogos$anunciosArgs<ExtArgs> = {}>(args?: Subset<T, Jogos$anunciosArgs<ExtArgs>>): Prisma.PrismaPromise<$Types.GetResult<AnunciosPayload<ExtArgs>, T, 'findMany', never>| Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * Jogos base type for findUnique actions
   */
  export type JogosFindUniqueArgsBase<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Jogos
     */
    select?: JogosSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: JogosInclude<ExtArgs> | null
    /**
     * Filter, which Jogos to fetch.
     */
    where: JogosWhereUniqueInput
  }

  /**
   * Jogos findUnique
   */
  export interface JogosFindUniqueArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends JogosFindUniqueArgsBase<ExtArgs> {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Jogos findUniqueOrThrow
   */
  export type JogosFindUniqueOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Jogos
     */
    select?: JogosSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: JogosInclude<ExtArgs> | null
    /**
     * Filter, which Jogos to fetch.
     */
    where: JogosWhereUniqueInput
  }


  /**
   * Jogos base type for findFirst actions
   */
  export type JogosFindFirstArgsBase<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Jogos
     */
    select?: JogosSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: JogosInclude<ExtArgs> | null
    /**
     * Filter, which Jogos to fetch.
     */
    where?: JogosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Jogos to fetch.
     */
    orderBy?: Enumerable<JogosOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Jogos.
     */
    cursor?: JogosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Jogos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Jogos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Jogos.
     */
    distinct?: Enumerable<JogosScalarFieldEnum>
  }

  /**
   * Jogos findFirst
   */
  export interface JogosFindFirstArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends JogosFindFirstArgsBase<ExtArgs> {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Jogos findFirstOrThrow
   */
  export type JogosFindFirstOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Jogos
     */
    select?: JogosSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: JogosInclude<ExtArgs> | null
    /**
     * Filter, which Jogos to fetch.
     */
    where?: JogosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Jogos to fetch.
     */
    orderBy?: Enumerable<JogosOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Jogos.
     */
    cursor?: JogosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Jogos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Jogos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Jogos.
     */
    distinct?: Enumerable<JogosScalarFieldEnum>
  }


  /**
   * Jogos findMany
   */
  export type JogosFindManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Jogos
     */
    select?: JogosSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: JogosInclude<ExtArgs> | null
    /**
     * Filter, which Jogos to fetch.
     */
    where?: JogosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Jogos to fetch.
     */
    orderBy?: Enumerable<JogosOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Jogos.
     */
    cursor?: JogosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Jogos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Jogos.
     */
    skip?: number
    distinct?: Enumerable<JogosScalarFieldEnum>
  }


  /**
   * Jogos create
   */
  export type JogosCreateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Jogos
     */
    select?: JogosSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: JogosInclude<ExtArgs> | null
    /**
     * The data needed to create a Jogos.
     */
    data: XOR<JogosCreateInput, JogosUncheckedCreateInput>
  }


  /**
   * Jogos update
   */
  export type JogosUpdateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Jogos
     */
    select?: JogosSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: JogosInclude<ExtArgs> | null
    /**
     * The data needed to update a Jogos.
     */
    data: XOR<JogosUpdateInput, JogosUncheckedUpdateInput>
    /**
     * Choose, which Jogos to update.
     */
    where: JogosWhereUniqueInput
  }


  /**
   * Jogos updateMany
   */
  export type JogosUpdateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Jogos.
     */
    data: XOR<JogosUpdateManyMutationInput, JogosUncheckedUpdateManyInput>
    /**
     * Filter which Jogos to update
     */
    where?: JogosWhereInput
  }


  /**
   * Jogos upsert
   */
  export type JogosUpsertArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Jogos
     */
    select?: JogosSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: JogosInclude<ExtArgs> | null
    /**
     * The filter to search for the Jogos to update in case it exists.
     */
    where: JogosWhereUniqueInput
    /**
     * In case the Jogos found by the `where` argument doesn't exist, create a new Jogos with this data.
     */
    create: XOR<JogosCreateInput, JogosUncheckedCreateInput>
    /**
     * In case the Jogos was found with the provided `where` argument, update it with this data.
     */
    update: XOR<JogosUpdateInput, JogosUncheckedUpdateInput>
  }


  /**
   * Jogos delete
   */
  export type JogosDeleteArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Jogos
     */
    select?: JogosSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: JogosInclude<ExtArgs> | null
    /**
     * Filter which Jogos to delete.
     */
    where: JogosWhereUniqueInput
  }


  /**
   * Jogos deleteMany
   */
  export type JogosDeleteManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which Jogos to delete
     */
    where?: JogosWhereInput
  }


  /**
   * Jogos.anuncios
   */
  export type Jogos$anunciosArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Anuncios
     */
    select?: AnunciosSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: AnunciosInclude<ExtArgs> | null
    where?: AnunciosWhereInput
    orderBy?: Enumerable<AnunciosOrderByWithRelationInput>
    cursor?: AnunciosWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<AnunciosScalarFieldEnum>
  }


  /**
   * Jogos without action
   */
  export type JogosArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Jogos
     */
    select?: JogosSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: JogosInclude<ExtArgs> | null
  }



  /**
   * Model Anuncios
   */


  export type AggregateAnuncios = {
    _count: AnunciosCountAggregateOutputType | null
    _avg: AnunciosAvgAggregateOutputType | null
    _sum: AnunciosSumAggregateOutputType | null
    _min: AnunciosMinAggregateOutputType | null
    _max: AnunciosMaxAggregateOutputType | null
  }

  export type AnunciosAvgAggregateOutputType = {
    tempoDeJogoEmAnos: number | null
    deHora: number | null
    ateHora: number | null
  }

  export type AnunciosSumAggregateOutputType = {
    tempoDeJogoEmAnos: number | null
    deHora: number | null
    ateHora: number | null
  }

  export type AnunciosMinAggregateOutputType = {
    id: string | null
    jogoId: string | null
    nomeDoUsuario: string | null
    tempoDeJogoEmAnos: number | null
    discord: string | null
    diasQueJoga: string | null
    deHora: number | null
    ateHora: number | null
    usaChatDeVoz: boolean | null
    dataDeCriacao: Date | null
  }

  export type AnunciosMaxAggregateOutputType = {
    id: string | null
    jogoId: string | null
    nomeDoUsuario: string | null
    tempoDeJogoEmAnos: number | null
    discord: string | null
    diasQueJoga: string | null
    deHora: number | null
    ateHora: number | null
    usaChatDeVoz: boolean | null
    dataDeCriacao: Date | null
  }

  export type AnunciosCountAggregateOutputType = {
    id: number
    jogoId: number
    nomeDoUsuario: number
    tempoDeJogoEmAnos: number
    discord: number
    diasQueJoga: number
    deHora: number
    ateHora: number
    usaChatDeVoz: number
    dataDeCriacao: number
    _all: number
  }


  export type AnunciosAvgAggregateInputType = {
    tempoDeJogoEmAnos?: true
    deHora?: true
    ateHora?: true
  }

  export type AnunciosSumAggregateInputType = {
    tempoDeJogoEmAnos?: true
    deHora?: true
    ateHora?: true
  }

  export type AnunciosMinAggregateInputType = {
    id?: true
    jogoId?: true
    nomeDoUsuario?: true
    tempoDeJogoEmAnos?: true
    discord?: true
    diasQueJoga?: true
    deHora?: true
    ateHora?: true
    usaChatDeVoz?: true
    dataDeCriacao?: true
  }

  export type AnunciosMaxAggregateInputType = {
    id?: true
    jogoId?: true
    nomeDoUsuario?: true
    tempoDeJogoEmAnos?: true
    discord?: true
    diasQueJoga?: true
    deHora?: true
    ateHora?: true
    usaChatDeVoz?: true
    dataDeCriacao?: true
  }

  export type AnunciosCountAggregateInputType = {
    id?: true
    jogoId?: true
    nomeDoUsuario?: true
    tempoDeJogoEmAnos?: true
    discord?: true
    diasQueJoga?: true
    deHora?: true
    ateHora?: true
    usaChatDeVoz?: true
    dataDeCriacao?: true
    _all?: true
  }

  export type AnunciosAggregateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which Anuncios to aggregate.
     */
    where?: AnunciosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Anuncios to fetch.
     */
    orderBy?: Enumerable<AnunciosOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AnunciosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Anuncios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Anuncios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Anuncios
    **/
    _count?: true | AnunciosCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AnunciosAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AnunciosSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AnunciosMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AnunciosMaxAggregateInputType
  }

  export type GetAnunciosAggregateType<T extends AnunciosAggregateArgs> = {
        [P in keyof T & keyof AggregateAnuncios]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAnuncios[P]>
      : GetScalarType<T[P], AggregateAnuncios[P]>
  }




  export type AnunciosGroupByArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: AnunciosWhereInput
    orderBy?: Enumerable<AnunciosOrderByWithAggregationInput>
    by: AnunciosScalarFieldEnum[]
    having?: AnunciosScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AnunciosCountAggregateInputType | true
    _avg?: AnunciosAvgAggregateInputType
    _sum?: AnunciosSumAggregateInputType
    _min?: AnunciosMinAggregateInputType
    _max?: AnunciosMaxAggregateInputType
  }


  export type AnunciosGroupByOutputType = {
    id: string
    jogoId: string
    nomeDoUsuario: string
    tempoDeJogoEmAnos: number
    discord: string
    diasQueJoga: string
    deHora: number
    ateHora: number
    usaChatDeVoz: boolean
    dataDeCriacao: Date
    _count: AnunciosCountAggregateOutputType | null
    _avg: AnunciosAvgAggregateOutputType | null
    _sum: AnunciosSumAggregateOutputType | null
    _min: AnunciosMinAggregateOutputType | null
    _max: AnunciosMaxAggregateOutputType | null
  }

  type GetAnunciosGroupByPayload<T extends AnunciosGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<AnunciosGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AnunciosGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AnunciosGroupByOutputType[P]>
            : GetScalarType<T[P], AnunciosGroupByOutputType[P]>
        }
      >
    >


  export type AnunciosSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    jogoId?: boolean
    nomeDoUsuario?: boolean
    tempoDeJogoEmAnos?: boolean
    discord?: boolean
    diasQueJoga?: boolean
    deHora?: boolean
    ateHora?: boolean
    usaChatDeVoz?: boolean
    dataDeCriacao?: boolean
    jogo?: boolean | JogosArgs<ExtArgs>
  }, ExtArgs["result"]["anuncios"]>

  export type AnunciosSelectScalar = {
    id?: boolean
    jogoId?: boolean
    nomeDoUsuario?: boolean
    tempoDeJogoEmAnos?: boolean
    discord?: boolean
    diasQueJoga?: boolean
    deHora?: boolean
    ateHora?: boolean
    usaChatDeVoz?: boolean
    dataDeCriacao?: boolean
  }

  export type AnunciosInclude<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    jogo?: boolean | JogosArgs<ExtArgs>
  }


  type AnunciosGetPayload<S extends boolean | null | undefined | AnunciosArgs> = $Types.GetResult<AnunciosPayload, S>

  type AnunciosCountArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = 
    Omit<AnunciosFindManyArgs, 'select' | 'include'> & {
      select?: AnunciosCountAggregateInputType | true
    }

  export interface AnunciosDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Anuncios'], meta: { name: 'Anuncios' } }
    /**
     * Find zero or one Anuncios that matches the filter.
     * @param {AnunciosFindUniqueArgs} args - Arguments to find a Anuncios
     * @example
     * // Get one Anuncios
     * const anuncios = await prisma.anuncios.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends AnunciosFindUniqueArgs<ExtArgs>, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, AnunciosFindUniqueArgs<ExtArgs>>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Anuncios'> extends True ? Prisma__AnunciosClient<$Types.GetResult<AnunciosPayload<ExtArgs>, T, 'findUnique', never>, never, ExtArgs> : Prisma__AnunciosClient<$Types.GetResult<AnunciosPayload<ExtArgs>, T, 'findUnique', never> | null, null, ExtArgs>

    /**
     * Find one Anuncios that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {AnunciosFindUniqueOrThrowArgs} args - Arguments to find a Anuncios
     * @example
     * // Get one Anuncios
     * const anuncios = await prisma.anuncios.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends AnunciosFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, AnunciosFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__AnunciosClient<$Types.GetResult<AnunciosPayload<ExtArgs>, T, 'findUniqueOrThrow', never>, never, ExtArgs>

    /**
     * Find the first Anuncios that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnunciosFindFirstArgs} args - Arguments to find a Anuncios
     * @example
     * // Get one Anuncios
     * const anuncios = await prisma.anuncios.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends AnunciosFindFirstArgs<ExtArgs>, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, AnunciosFindFirstArgs<ExtArgs>>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Anuncios'> extends True ? Prisma__AnunciosClient<$Types.GetResult<AnunciosPayload<ExtArgs>, T, 'findFirst', never>, never, ExtArgs> : Prisma__AnunciosClient<$Types.GetResult<AnunciosPayload<ExtArgs>, T, 'findFirst', never> | null, null, ExtArgs>

    /**
     * Find the first Anuncios that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnunciosFindFirstOrThrowArgs} args - Arguments to find a Anuncios
     * @example
     * // Get one Anuncios
     * const anuncios = await prisma.anuncios.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends AnunciosFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, AnunciosFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__AnunciosClient<$Types.GetResult<AnunciosPayload<ExtArgs>, T, 'findFirstOrThrow', never>, never, ExtArgs>

    /**
     * Find zero or more Anuncios that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnunciosFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Anuncios
     * const anuncios = await prisma.anuncios.findMany()
     * 
     * // Get first 10 Anuncios
     * const anuncios = await prisma.anuncios.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const anunciosWithIdOnly = await prisma.anuncios.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends AnunciosFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, AnunciosFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Types.GetResult<AnunciosPayload<ExtArgs>, T, 'findMany', never>>

    /**
     * Create a Anuncios.
     * @param {AnunciosCreateArgs} args - Arguments to create a Anuncios.
     * @example
     * // Create one Anuncios
     * const Anuncios = await prisma.anuncios.create({
     *   data: {
     *     // ... data to create a Anuncios
     *   }
     * })
     * 
    **/
    create<T extends AnunciosCreateArgs<ExtArgs>>(
      args: SelectSubset<T, AnunciosCreateArgs<ExtArgs>>
    ): Prisma__AnunciosClient<$Types.GetResult<AnunciosPayload<ExtArgs>, T, 'create', never>, never, ExtArgs>

    /**
     * Delete a Anuncios.
     * @param {AnunciosDeleteArgs} args - Arguments to delete one Anuncios.
     * @example
     * // Delete one Anuncios
     * const Anuncios = await prisma.anuncios.delete({
     *   where: {
     *     // ... filter to delete one Anuncios
     *   }
     * })
     * 
    **/
    delete<T extends AnunciosDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, AnunciosDeleteArgs<ExtArgs>>
    ): Prisma__AnunciosClient<$Types.GetResult<AnunciosPayload<ExtArgs>, T, 'delete', never>, never, ExtArgs>

    /**
     * Update one Anuncios.
     * @param {AnunciosUpdateArgs} args - Arguments to update one Anuncios.
     * @example
     * // Update one Anuncios
     * const anuncios = await prisma.anuncios.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends AnunciosUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, AnunciosUpdateArgs<ExtArgs>>
    ): Prisma__AnunciosClient<$Types.GetResult<AnunciosPayload<ExtArgs>, T, 'update', never>, never, ExtArgs>

    /**
     * Delete zero or more Anuncios.
     * @param {AnunciosDeleteManyArgs} args - Arguments to filter Anuncios to delete.
     * @example
     * // Delete a few Anuncios
     * const { count } = await prisma.anuncios.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends AnunciosDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, AnunciosDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Anuncios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnunciosUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Anuncios
     * const anuncios = await prisma.anuncios.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends AnunciosUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, AnunciosUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Anuncios.
     * @param {AnunciosUpsertArgs} args - Arguments to update or create a Anuncios.
     * @example
     * // Update or create a Anuncios
     * const anuncios = await prisma.anuncios.upsert({
     *   create: {
     *     // ... data to create a Anuncios
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Anuncios we want to update
     *   }
     * })
    **/
    upsert<T extends AnunciosUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, AnunciosUpsertArgs<ExtArgs>>
    ): Prisma__AnunciosClient<$Types.GetResult<AnunciosPayload<ExtArgs>, T, 'upsert', never>, never, ExtArgs>

    /**
     * Count the number of Anuncios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnunciosCountArgs} args - Arguments to filter Anuncios to count.
     * @example
     * // Count the number of Anuncios
     * const count = await prisma.anuncios.count({
     *   where: {
     *     // ... the filter for the Anuncios we want to count
     *   }
     * })
    **/
    count<T extends AnunciosCountArgs>(
      args?: Subset<T, AnunciosCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AnunciosCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Anuncios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnunciosAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AnunciosAggregateArgs>(args: Subset<T, AnunciosAggregateArgs>): Prisma.PrismaPromise<GetAnunciosAggregateType<T>>

    /**
     * Group by Anuncios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnunciosGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AnunciosGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AnunciosGroupByArgs['orderBy'] }
        : { orderBy?: AnunciosGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AnunciosGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAnunciosGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Anuncios.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__AnunciosClient<T, Null = never, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);

    jogo<T extends JogosArgs<ExtArgs> = {}>(args?: Subset<T, JogosArgs<ExtArgs>>): Prisma__JogosClient<$Types.GetResult<JogosPayload<ExtArgs>, T, 'findUnique', never> | Null, never, ExtArgs>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * Anuncios base type for findUnique actions
   */
  export type AnunciosFindUniqueArgsBase<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Anuncios
     */
    select?: AnunciosSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: AnunciosInclude<ExtArgs> | null
    /**
     * Filter, which Anuncios to fetch.
     */
    where: AnunciosWhereUniqueInput
  }

  /**
   * Anuncios findUnique
   */
  export interface AnunciosFindUniqueArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends AnunciosFindUniqueArgsBase<ExtArgs> {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Anuncios findUniqueOrThrow
   */
  export type AnunciosFindUniqueOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Anuncios
     */
    select?: AnunciosSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: AnunciosInclude<ExtArgs> | null
    /**
     * Filter, which Anuncios to fetch.
     */
    where: AnunciosWhereUniqueInput
  }


  /**
   * Anuncios base type for findFirst actions
   */
  export type AnunciosFindFirstArgsBase<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Anuncios
     */
    select?: AnunciosSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: AnunciosInclude<ExtArgs> | null
    /**
     * Filter, which Anuncios to fetch.
     */
    where?: AnunciosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Anuncios to fetch.
     */
    orderBy?: Enumerable<AnunciosOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Anuncios.
     */
    cursor?: AnunciosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Anuncios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Anuncios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Anuncios.
     */
    distinct?: Enumerable<AnunciosScalarFieldEnum>
  }

  /**
   * Anuncios findFirst
   */
  export interface AnunciosFindFirstArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends AnunciosFindFirstArgsBase<ExtArgs> {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Anuncios findFirstOrThrow
   */
  export type AnunciosFindFirstOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Anuncios
     */
    select?: AnunciosSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: AnunciosInclude<ExtArgs> | null
    /**
     * Filter, which Anuncios to fetch.
     */
    where?: AnunciosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Anuncios to fetch.
     */
    orderBy?: Enumerable<AnunciosOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Anuncios.
     */
    cursor?: AnunciosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Anuncios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Anuncios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Anuncios.
     */
    distinct?: Enumerable<AnunciosScalarFieldEnum>
  }


  /**
   * Anuncios findMany
   */
  export type AnunciosFindManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Anuncios
     */
    select?: AnunciosSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: AnunciosInclude<ExtArgs> | null
    /**
     * Filter, which Anuncios to fetch.
     */
    where?: AnunciosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Anuncios to fetch.
     */
    orderBy?: Enumerable<AnunciosOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Anuncios.
     */
    cursor?: AnunciosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Anuncios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Anuncios.
     */
    skip?: number
    distinct?: Enumerable<AnunciosScalarFieldEnum>
  }


  /**
   * Anuncios create
   */
  export type AnunciosCreateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Anuncios
     */
    select?: AnunciosSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: AnunciosInclude<ExtArgs> | null
    /**
     * The data needed to create a Anuncios.
     */
    data: XOR<AnunciosCreateInput, AnunciosUncheckedCreateInput>
  }


  /**
   * Anuncios update
   */
  export type AnunciosUpdateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Anuncios
     */
    select?: AnunciosSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: AnunciosInclude<ExtArgs> | null
    /**
     * The data needed to update a Anuncios.
     */
    data: XOR<AnunciosUpdateInput, AnunciosUncheckedUpdateInput>
    /**
     * Choose, which Anuncios to update.
     */
    where: AnunciosWhereUniqueInput
  }


  /**
   * Anuncios updateMany
   */
  export type AnunciosUpdateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Anuncios.
     */
    data: XOR<AnunciosUpdateManyMutationInput, AnunciosUncheckedUpdateManyInput>
    /**
     * Filter which Anuncios to update
     */
    where?: AnunciosWhereInput
  }


  /**
   * Anuncios upsert
   */
  export type AnunciosUpsertArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Anuncios
     */
    select?: AnunciosSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: AnunciosInclude<ExtArgs> | null
    /**
     * The filter to search for the Anuncios to update in case it exists.
     */
    where: AnunciosWhereUniqueInput
    /**
     * In case the Anuncios found by the `where` argument doesn't exist, create a new Anuncios with this data.
     */
    create: XOR<AnunciosCreateInput, AnunciosUncheckedCreateInput>
    /**
     * In case the Anuncios was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AnunciosUpdateInput, AnunciosUncheckedUpdateInput>
  }


  /**
   * Anuncios delete
   */
  export type AnunciosDeleteArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Anuncios
     */
    select?: AnunciosSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: AnunciosInclude<ExtArgs> | null
    /**
     * Filter which Anuncios to delete.
     */
    where: AnunciosWhereUniqueInput
  }


  /**
   * Anuncios deleteMany
   */
  export type AnunciosDeleteManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which Anuncios to delete
     */
    where?: AnunciosWhereInput
  }


  /**
   * Anuncios without action
   */
  export type AnunciosArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Anuncios
     */
    select?: AnunciosSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: AnunciosInclude<ExtArgs> | null
  }



  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const JogosScalarFieldEnum: {
    id: 'id',
    nome: 'nome',
    url: 'url',
    nomeUrl: 'nomeUrl',
    urlImagem: 'urlImagem'
  };

  export type JogosScalarFieldEnum = (typeof JogosScalarFieldEnum)[keyof typeof JogosScalarFieldEnum]


  export const AnunciosScalarFieldEnum: {
    id: 'id',
    jogoId: 'jogoId',
    nomeDoUsuario: 'nomeDoUsuario',
    tempoDeJogoEmAnos: 'tempoDeJogoEmAnos',
    discord: 'discord',
    diasQueJoga: 'diasQueJoga',
    deHora: 'deHora',
    ateHora: 'ateHora',
    usaChatDeVoz: 'usaChatDeVoz',
    dataDeCriacao: 'dataDeCriacao'
  };

  export type AnunciosScalarFieldEnum = (typeof AnunciosScalarFieldEnum)[keyof typeof AnunciosScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  /**
   * Deep Input Types
   */


  export type JogosWhereInput = {
    AND?: Enumerable<JogosWhereInput>
    OR?: Enumerable<JogosWhereInput>
    NOT?: Enumerable<JogosWhereInput>
    id?: StringFilter | string
    nome?: StringFilter | string
    url?: StringFilter | string
    nomeUrl?: StringFilter | string
    urlImagem?: StringFilter | string
    anuncios?: AnunciosListRelationFilter
  }

  export type JogosOrderByWithRelationInput = {
    id?: SortOrder
    nome?: SortOrder
    url?: SortOrder
    nomeUrl?: SortOrder
    urlImagem?: SortOrder
    anuncios?: AnunciosOrderByRelationAggregateInput
  }

  export type JogosWhereUniqueInput = {
    id?: string
    nomeUrl?: string
  }

  export type JogosOrderByWithAggregationInput = {
    id?: SortOrder
    nome?: SortOrder
    url?: SortOrder
    nomeUrl?: SortOrder
    urlImagem?: SortOrder
    _count?: JogosCountOrderByAggregateInput
    _max?: JogosMaxOrderByAggregateInput
    _min?: JogosMinOrderByAggregateInput
  }

  export type JogosScalarWhereWithAggregatesInput = {
    AND?: Enumerable<JogosScalarWhereWithAggregatesInput>
    OR?: Enumerable<JogosScalarWhereWithAggregatesInput>
    NOT?: Enumerable<JogosScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    nome?: StringWithAggregatesFilter | string
    url?: StringWithAggregatesFilter | string
    nomeUrl?: StringWithAggregatesFilter | string
    urlImagem?: StringWithAggregatesFilter | string
  }

  export type AnunciosWhereInput = {
    AND?: Enumerable<AnunciosWhereInput>
    OR?: Enumerable<AnunciosWhereInput>
    NOT?: Enumerable<AnunciosWhereInput>
    id?: StringFilter | string
    jogoId?: StringFilter | string
    nomeDoUsuario?: StringFilter | string
    tempoDeJogoEmAnos?: IntFilter | number
    discord?: StringFilter | string
    diasQueJoga?: StringFilter | string
    deHora?: IntFilter | number
    ateHora?: IntFilter | number
    usaChatDeVoz?: BoolFilter | boolean
    dataDeCriacao?: DateTimeFilter | Date | string
    jogo?: XOR<JogosRelationFilter, JogosWhereInput>
  }

  export type AnunciosOrderByWithRelationInput = {
    id?: SortOrder
    jogoId?: SortOrder
    nomeDoUsuario?: SortOrder
    tempoDeJogoEmAnos?: SortOrder
    discord?: SortOrder
    diasQueJoga?: SortOrder
    deHora?: SortOrder
    ateHora?: SortOrder
    usaChatDeVoz?: SortOrder
    dataDeCriacao?: SortOrder
    jogo?: JogosOrderByWithRelationInput
  }

  export type AnunciosWhereUniqueInput = {
    id?: string
  }

  export type AnunciosOrderByWithAggregationInput = {
    id?: SortOrder
    jogoId?: SortOrder
    nomeDoUsuario?: SortOrder
    tempoDeJogoEmAnos?: SortOrder
    discord?: SortOrder
    diasQueJoga?: SortOrder
    deHora?: SortOrder
    ateHora?: SortOrder
    usaChatDeVoz?: SortOrder
    dataDeCriacao?: SortOrder
    _count?: AnunciosCountOrderByAggregateInput
    _avg?: AnunciosAvgOrderByAggregateInput
    _max?: AnunciosMaxOrderByAggregateInput
    _min?: AnunciosMinOrderByAggregateInput
    _sum?: AnunciosSumOrderByAggregateInput
  }

  export type AnunciosScalarWhereWithAggregatesInput = {
    AND?: Enumerable<AnunciosScalarWhereWithAggregatesInput>
    OR?: Enumerable<AnunciosScalarWhereWithAggregatesInput>
    NOT?: Enumerable<AnunciosScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    jogoId?: StringWithAggregatesFilter | string
    nomeDoUsuario?: StringWithAggregatesFilter | string
    tempoDeJogoEmAnos?: IntWithAggregatesFilter | number
    discord?: StringWithAggregatesFilter | string
    diasQueJoga?: StringWithAggregatesFilter | string
    deHora?: IntWithAggregatesFilter | number
    ateHora?: IntWithAggregatesFilter | number
    usaChatDeVoz?: BoolWithAggregatesFilter | boolean
    dataDeCriacao?: DateTimeWithAggregatesFilter | Date | string
  }

  export type JogosCreateInput = {
    id?: string
    nome: string
    url: string
    nomeUrl: string
    urlImagem: string
    anuncios?: AnunciosCreateNestedManyWithoutJogoInput
  }

  export type JogosUncheckedCreateInput = {
    id?: string
    nome: string
    url: string
    nomeUrl: string
    urlImagem: string
    anuncios?: AnunciosUncheckedCreateNestedManyWithoutJogoInput
  }

  export type JogosUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    nomeUrl?: StringFieldUpdateOperationsInput | string
    urlImagem?: StringFieldUpdateOperationsInput | string
    anuncios?: AnunciosUpdateManyWithoutJogoNestedInput
  }

  export type JogosUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    nomeUrl?: StringFieldUpdateOperationsInput | string
    urlImagem?: StringFieldUpdateOperationsInput | string
    anuncios?: AnunciosUncheckedUpdateManyWithoutJogoNestedInput
  }

  export type JogosUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    nomeUrl?: StringFieldUpdateOperationsInput | string
    urlImagem?: StringFieldUpdateOperationsInput | string
  }

  export type JogosUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    nomeUrl?: StringFieldUpdateOperationsInput | string
    urlImagem?: StringFieldUpdateOperationsInput | string
  }

  export type AnunciosCreateInput = {
    id?: string
    nomeDoUsuario: string
    tempoDeJogoEmAnos: number
    discord: string
    diasQueJoga: string
    deHora: number
    ateHora: number
    usaChatDeVoz: boolean
    dataDeCriacao?: Date | string
    jogo: JogosCreateNestedOneWithoutAnunciosInput
  }

  export type AnunciosUncheckedCreateInput = {
    id?: string
    jogoId: string
    nomeDoUsuario: string
    tempoDeJogoEmAnos: number
    discord: string
    diasQueJoga: string
    deHora: number
    ateHora: number
    usaChatDeVoz: boolean
    dataDeCriacao?: Date | string
  }

  export type AnunciosUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nomeDoUsuario?: StringFieldUpdateOperationsInput | string
    tempoDeJogoEmAnos?: IntFieldUpdateOperationsInput | number
    discord?: StringFieldUpdateOperationsInput | string
    diasQueJoga?: StringFieldUpdateOperationsInput | string
    deHora?: IntFieldUpdateOperationsInput | number
    ateHora?: IntFieldUpdateOperationsInput | number
    usaChatDeVoz?: BoolFieldUpdateOperationsInput | boolean
    dataDeCriacao?: DateTimeFieldUpdateOperationsInput | Date | string
    jogo?: JogosUpdateOneRequiredWithoutAnunciosNestedInput
  }

  export type AnunciosUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    jogoId?: StringFieldUpdateOperationsInput | string
    nomeDoUsuario?: StringFieldUpdateOperationsInput | string
    tempoDeJogoEmAnos?: IntFieldUpdateOperationsInput | number
    discord?: StringFieldUpdateOperationsInput | string
    diasQueJoga?: StringFieldUpdateOperationsInput | string
    deHora?: IntFieldUpdateOperationsInput | number
    ateHora?: IntFieldUpdateOperationsInput | number
    usaChatDeVoz?: BoolFieldUpdateOperationsInput | boolean
    dataDeCriacao?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AnunciosUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nomeDoUsuario?: StringFieldUpdateOperationsInput | string
    tempoDeJogoEmAnos?: IntFieldUpdateOperationsInput | number
    discord?: StringFieldUpdateOperationsInput | string
    diasQueJoga?: StringFieldUpdateOperationsInput | string
    deHora?: IntFieldUpdateOperationsInput | number
    ateHora?: IntFieldUpdateOperationsInput | number
    usaChatDeVoz?: BoolFieldUpdateOperationsInput | boolean
    dataDeCriacao?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AnunciosUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    jogoId?: StringFieldUpdateOperationsInput | string
    nomeDoUsuario?: StringFieldUpdateOperationsInput | string
    tempoDeJogoEmAnos?: IntFieldUpdateOperationsInput | number
    discord?: StringFieldUpdateOperationsInput | string
    diasQueJoga?: StringFieldUpdateOperationsInput | string
    deHora?: IntFieldUpdateOperationsInput | number
    ateHora?: IntFieldUpdateOperationsInput | number
    usaChatDeVoz?: BoolFieldUpdateOperationsInput | boolean
    dataDeCriacao?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter = {
    equals?: string
    in?: Enumerable<string> | string
    notIn?: Enumerable<string> | string
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringFilter | string
  }

  export type AnunciosListRelationFilter = {
    every?: AnunciosWhereInput
    some?: AnunciosWhereInput
    none?: AnunciosWhereInput
  }

  export type AnunciosOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type JogosCountOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    url?: SortOrder
    nomeUrl?: SortOrder
    urlImagem?: SortOrder
  }

  export type JogosMaxOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    url?: SortOrder
    nomeUrl?: SortOrder
    urlImagem?: SortOrder
  }

  export type JogosMinOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    url?: SortOrder
    nomeUrl?: SortOrder
    urlImagem?: SortOrder
  }

  export type StringWithAggregatesFilter = {
    equals?: string
    in?: Enumerable<string> | string
    notIn?: Enumerable<string> | string
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringWithAggregatesFilter | string
    _count?: NestedIntFilter
    _min?: NestedStringFilter
    _max?: NestedStringFilter
  }

  export type IntFilter = {
    equals?: number
    in?: Enumerable<number> | number
    notIn?: Enumerable<number> | number
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntFilter | number
  }

  export type BoolFilter = {
    equals?: boolean
    not?: NestedBoolFilter | boolean
  }

  export type DateTimeFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string> | Date | string
    notIn?: Enumerable<Date> | Enumerable<string> | Date | string
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeFilter | Date | string
  }

  export type JogosRelationFilter = {
    is?: JogosWhereInput | null
    isNot?: JogosWhereInput | null
  }

  export type AnunciosCountOrderByAggregateInput = {
    id?: SortOrder
    jogoId?: SortOrder
    nomeDoUsuario?: SortOrder
    tempoDeJogoEmAnos?: SortOrder
    discord?: SortOrder
    diasQueJoga?: SortOrder
    deHora?: SortOrder
    ateHora?: SortOrder
    usaChatDeVoz?: SortOrder
    dataDeCriacao?: SortOrder
  }

  export type AnunciosAvgOrderByAggregateInput = {
    tempoDeJogoEmAnos?: SortOrder
    deHora?: SortOrder
    ateHora?: SortOrder
  }

  export type AnunciosMaxOrderByAggregateInput = {
    id?: SortOrder
    jogoId?: SortOrder
    nomeDoUsuario?: SortOrder
    tempoDeJogoEmAnos?: SortOrder
    discord?: SortOrder
    diasQueJoga?: SortOrder
    deHora?: SortOrder
    ateHora?: SortOrder
    usaChatDeVoz?: SortOrder
    dataDeCriacao?: SortOrder
  }

  export type AnunciosMinOrderByAggregateInput = {
    id?: SortOrder
    jogoId?: SortOrder
    nomeDoUsuario?: SortOrder
    tempoDeJogoEmAnos?: SortOrder
    discord?: SortOrder
    diasQueJoga?: SortOrder
    deHora?: SortOrder
    ateHora?: SortOrder
    usaChatDeVoz?: SortOrder
    dataDeCriacao?: SortOrder
  }

  export type AnunciosSumOrderByAggregateInput = {
    tempoDeJogoEmAnos?: SortOrder
    deHora?: SortOrder
    ateHora?: SortOrder
  }

  export type IntWithAggregatesFilter = {
    equals?: number
    in?: Enumerable<number> | number
    notIn?: Enumerable<number> | number
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntWithAggregatesFilter | number
    _count?: NestedIntFilter
    _avg?: NestedFloatFilter
    _sum?: NestedIntFilter
    _min?: NestedIntFilter
    _max?: NestedIntFilter
  }

  export type BoolWithAggregatesFilter = {
    equals?: boolean
    not?: NestedBoolWithAggregatesFilter | boolean
    _count?: NestedIntFilter
    _min?: NestedBoolFilter
    _max?: NestedBoolFilter
  }

  export type DateTimeWithAggregatesFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string> | Date | string
    notIn?: Enumerable<Date> | Enumerable<string> | Date | string
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeWithAggregatesFilter | Date | string
    _count?: NestedIntFilter
    _min?: NestedDateTimeFilter
    _max?: NestedDateTimeFilter
  }

  export type AnunciosCreateNestedManyWithoutJogoInput = {
    create?: XOR<Enumerable<AnunciosCreateWithoutJogoInput>, Enumerable<AnunciosUncheckedCreateWithoutJogoInput>>
    connectOrCreate?: Enumerable<AnunciosCreateOrConnectWithoutJogoInput>
    connect?: Enumerable<AnunciosWhereUniqueInput>
  }

  export type AnunciosUncheckedCreateNestedManyWithoutJogoInput = {
    create?: XOR<Enumerable<AnunciosCreateWithoutJogoInput>, Enumerable<AnunciosUncheckedCreateWithoutJogoInput>>
    connectOrCreate?: Enumerable<AnunciosCreateOrConnectWithoutJogoInput>
    connect?: Enumerable<AnunciosWhereUniqueInput>
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type AnunciosUpdateManyWithoutJogoNestedInput = {
    create?: XOR<Enumerable<AnunciosCreateWithoutJogoInput>, Enumerable<AnunciosUncheckedCreateWithoutJogoInput>>
    connectOrCreate?: Enumerable<AnunciosCreateOrConnectWithoutJogoInput>
    upsert?: Enumerable<AnunciosUpsertWithWhereUniqueWithoutJogoInput>
    set?: Enumerable<AnunciosWhereUniqueInput>
    disconnect?: Enumerable<AnunciosWhereUniqueInput>
    delete?: Enumerable<AnunciosWhereUniqueInput>
    connect?: Enumerable<AnunciosWhereUniqueInput>
    update?: Enumerable<AnunciosUpdateWithWhereUniqueWithoutJogoInput>
    updateMany?: Enumerable<AnunciosUpdateManyWithWhereWithoutJogoInput>
    deleteMany?: Enumerable<AnunciosScalarWhereInput>
  }

  export type AnunciosUncheckedUpdateManyWithoutJogoNestedInput = {
    create?: XOR<Enumerable<AnunciosCreateWithoutJogoInput>, Enumerable<AnunciosUncheckedCreateWithoutJogoInput>>
    connectOrCreate?: Enumerable<AnunciosCreateOrConnectWithoutJogoInput>
    upsert?: Enumerable<AnunciosUpsertWithWhereUniqueWithoutJogoInput>
    set?: Enumerable<AnunciosWhereUniqueInput>
    disconnect?: Enumerable<AnunciosWhereUniqueInput>
    delete?: Enumerable<AnunciosWhereUniqueInput>
    connect?: Enumerable<AnunciosWhereUniqueInput>
    update?: Enumerable<AnunciosUpdateWithWhereUniqueWithoutJogoInput>
    updateMany?: Enumerable<AnunciosUpdateManyWithWhereWithoutJogoInput>
    deleteMany?: Enumerable<AnunciosScalarWhereInput>
  }

  export type JogosCreateNestedOneWithoutAnunciosInput = {
    create?: XOR<JogosCreateWithoutAnunciosInput, JogosUncheckedCreateWithoutAnunciosInput>
    connectOrCreate?: JogosCreateOrConnectWithoutAnunciosInput
    connect?: JogosWhereUniqueInput
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type JogosUpdateOneRequiredWithoutAnunciosNestedInput = {
    create?: XOR<JogosCreateWithoutAnunciosInput, JogosUncheckedCreateWithoutAnunciosInput>
    connectOrCreate?: JogosCreateOrConnectWithoutAnunciosInput
    upsert?: JogosUpsertWithoutAnunciosInput
    connect?: JogosWhereUniqueInput
    update?: XOR<JogosUpdateWithoutAnunciosInput, JogosUncheckedUpdateWithoutAnunciosInput>
  }

  export type NestedStringFilter = {
    equals?: string
    in?: Enumerable<string> | string
    notIn?: Enumerable<string> | string
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringFilter | string
  }

  export type NestedStringWithAggregatesFilter = {
    equals?: string
    in?: Enumerable<string> | string
    notIn?: Enumerable<string> | string
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringWithAggregatesFilter | string
    _count?: NestedIntFilter
    _min?: NestedStringFilter
    _max?: NestedStringFilter
  }

  export type NestedIntFilter = {
    equals?: number
    in?: Enumerable<number> | number
    notIn?: Enumerable<number> | number
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntFilter | number
  }

  export type NestedBoolFilter = {
    equals?: boolean
    not?: NestedBoolFilter | boolean
  }

  export type NestedDateTimeFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string> | Date | string
    notIn?: Enumerable<Date> | Enumerable<string> | Date | string
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeFilter | Date | string
  }

  export type NestedIntWithAggregatesFilter = {
    equals?: number
    in?: Enumerable<number> | number
    notIn?: Enumerable<number> | number
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntWithAggregatesFilter | number
    _count?: NestedIntFilter
    _avg?: NestedFloatFilter
    _sum?: NestedIntFilter
    _min?: NestedIntFilter
    _max?: NestedIntFilter
  }

  export type NestedFloatFilter = {
    equals?: number
    in?: Enumerable<number> | number
    notIn?: Enumerable<number> | number
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatFilter | number
  }

  export type NestedBoolWithAggregatesFilter = {
    equals?: boolean
    not?: NestedBoolWithAggregatesFilter | boolean
    _count?: NestedIntFilter
    _min?: NestedBoolFilter
    _max?: NestedBoolFilter
  }

  export type NestedDateTimeWithAggregatesFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string> | Date | string
    notIn?: Enumerable<Date> | Enumerable<string> | Date | string
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeWithAggregatesFilter | Date | string
    _count?: NestedIntFilter
    _min?: NestedDateTimeFilter
    _max?: NestedDateTimeFilter
  }

  export type AnunciosCreateWithoutJogoInput = {
    id?: string
    nomeDoUsuario: string
    tempoDeJogoEmAnos: number
    discord: string
    diasQueJoga: string
    deHora: number
    ateHora: number
    usaChatDeVoz: boolean
    dataDeCriacao?: Date | string
  }

  export type AnunciosUncheckedCreateWithoutJogoInput = {
    id?: string
    nomeDoUsuario: string
    tempoDeJogoEmAnos: number
    discord: string
    diasQueJoga: string
    deHora: number
    ateHora: number
    usaChatDeVoz: boolean
    dataDeCriacao?: Date | string
  }

  export type AnunciosCreateOrConnectWithoutJogoInput = {
    where: AnunciosWhereUniqueInput
    create: XOR<AnunciosCreateWithoutJogoInput, AnunciosUncheckedCreateWithoutJogoInput>
  }

  export type AnunciosUpsertWithWhereUniqueWithoutJogoInput = {
    where: AnunciosWhereUniqueInput
    update: XOR<AnunciosUpdateWithoutJogoInput, AnunciosUncheckedUpdateWithoutJogoInput>
    create: XOR<AnunciosCreateWithoutJogoInput, AnunciosUncheckedCreateWithoutJogoInput>
  }

  export type AnunciosUpdateWithWhereUniqueWithoutJogoInput = {
    where: AnunciosWhereUniqueInput
    data: XOR<AnunciosUpdateWithoutJogoInput, AnunciosUncheckedUpdateWithoutJogoInput>
  }

  export type AnunciosUpdateManyWithWhereWithoutJogoInput = {
    where: AnunciosScalarWhereInput
    data: XOR<AnunciosUpdateManyMutationInput, AnunciosUncheckedUpdateManyWithoutAnunciosInput>
  }

  export type AnunciosScalarWhereInput = {
    AND?: Enumerable<AnunciosScalarWhereInput>
    OR?: Enumerable<AnunciosScalarWhereInput>
    NOT?: Enumerable<AnunciosScalarWhereInput>
    id?: StringFilter | string
    jogoId?: StringFilter | string
    nomeDoUsuario?: StringFilter | string
    tempoDeJogoEmAnos?: IntFilter | number
    discord?: StringFilter | string
    diasQueJoga?: StringFilter | string
    deHora?: IntFilter | number
    ateHora?: IntFilter | number
    usaChatDeVoz?: BoolFilter | boolean
    dataDeCriacao?: DateTimeFilter | Date | string
  }

  export type JogosCreateWithoutAnunciosInput = {
    id?: string
    nome: string
    url: string
    nomeUrl: string
    urlImagem: string
  }

  export type JogosUncheckedCreateWithoutAnunciosInput = {
    id?: string
    nome: string
    url: string
    nomeUrl: string
    urlImagem: string
  }

  export type JogosCreateOrConnectWithoutAnunciosInput = {
    where: JogosWhereUniqueInput
    create: XOR<JogosCreateWithoutAnunciosInput, JogosUncheckedCreateWithoutAnunciosInput>
  }

  export type JogosUpsertWithoutAnunciosInput = {
    update: XOR<JogosUpdateWithoutAnunciosInput, JogosUncheckedUpdateWithoutAnunciosInput>
    create: XOR<JogosCreateWithoutAnunciosInput, JogosUncheckedCreateWithoutAnunciosInput>
  }

  export type JogosUpdateWithoutAnunciosInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    nomeUrl?: StringFieldUpdateOperationsInput | string
    urlImagem?: StringFieldUpdateOperationsInput | string
  }

  export type JogosUncheckedUpdateWithoutAnunciosInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    nomeUrl?: StringFieldUpdateOperationsInput | string
    urlImagem?: StringFieldUpdateOperationsInput | string
  }

  export type AnunciosUpdateWithoutJogoInput = {
    id?: StringFieldUpdateOperationsInput | string
    nomeDoUsuario?: StringFieldUpdateOperationsInput | string
    tempoDeJogoEmAnos?: IntFieldUpdateOperationsInput | number
    discord?: StringFieldUpdateOperationsInput | string
    diasQueJoga?: StringFieldUpdateOperationsInput | string
    deHora?: IntFieldUpdateOperationsInput | number
    ateHora?: IntFieldUpdateOperationsInput | number
    usaChatDeVoz?: BoolFieldUpdateOperationsInput | boolean
    dataDeCriacao?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AnunciosUncheckedUpdateWithoutJogoInput = {
    id?: StringFieldUpdateOperationsInput | string
    nomeDoUsuario?: StringFieldUpdateOperationsInput | string
    tempoDeJogoEmAnos?: IntFieldUpdateOperationsInput | number
    discord?: StringFieldUpdateOperationsInput | string
    diasQueJoga?: StringFieldUpdateOperationsInput | string
    deHora?: IntFieldUpdateOperationsInput | number
    ateHora?: IntFieldUpdateOperationsInput | number
    usaChatDeVoz?: BoolFieldUpdateOperationsInput | boolean
    dataDeCriacao?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AnunciosUncheckedUpdateManyWithoutAnunciosInput = {
    id?: StringFieldUpdateOperationsInput | string
    nomeDoUsuario?: StringFieldUpdateOperationsInput | string
    tempoDeJogoEmAnos?: IntFieldUpdateOperationsInput | number
    discord?: StringFieldUpdateOperationsInput | string
    diasQueJoga?: StringFieldUpdateOperationsInput | string
    deHora?: IntFieldUpdateOperationsInput | number
    ateHora?: IntFieldUpdateOperationsInput | number
    usaChatDeVoz?: BoolFieldUpdateOperationsInput | boolean
    dataDeCriacao?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}