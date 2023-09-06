export interface IPackageRepository {
  type: string;
  url: string;
}
export interface IPackageAuthor {
  name: string;
  email: string;
  url: string;
}
export interface IPackageFunding {
  type: string;
  url: string;
}
export interface IPackageBugs {
  url: string;
}

export interface IPackage {
  name?: string;
  version?: string;
  description?: string;
  main?: string;
  module?: string;
  browser?: string;
  types?: string;
  devDependencies?: Record<string, string>;
  dependencies?: Record<string, string>;
  scripts?: Record<string, string>;
  respository?: IPackageRepository;
  keywords?: string[];
  author?: IPackageAuthor;
  funding?: IPackageFunding;
  license?: string;
  bugs?: IPackageBugs;
  homepage?: string;
}
