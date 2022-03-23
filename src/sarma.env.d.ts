declare type Predicate<T> = (data: T) => boolean;
declare type Consumer<T> = (data: T) => void;

declare interface Class {
  new (...args: any): any;
}

declare type Constructor<T extends Class> = (
  args: ConstructorParameters<T>
) => T;
