import { PullRequestState } from './pull.interface';

export type NormalizedPullRequests = NormalizedPullRequest[];
export type PullRequests = PullRequest[];

export interface NormalizedPullRequest {
  id: number;
  number: number;
  title: string;
  author: string;
  commit_count: number;
}

export interface PullRequest {
  url: string;
  id: number;
  node_id: string;
  html_url: string;
  diff_url: string;
  patch_url: string;
  issue_url: string;
  number: number;
  state: PullRequestState;
  locked: boolean;
  title: string;
  user: PullRequestUser;
  body: string;
  created_at: string;
  updated_at: string;
  closed_at: any;
  merged_at: any;
  merge_commit_sha: string;
  assignee: any;
  assignees: any[];
  requested_reviewers: any[];
  requested_teams: any[];
  labels: any[];
  milestone: any;
  draft: boolean;
  commits_url: string;
  review_comments_url: string;
  review_comment_url: string;
  comments_url: string;
  statuses_url: string;
  head: PullRequestHead;
  base: PullRequestBase;
  _links: PullRequestLinks;
  author_association: string;
  auto_merge: any;
  active_lock_reason: any;
}

declare interface PullRequestUser {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
}

declare interface PullRequestHead {
  label: string;
  ref: string;
  sha: string;
  user: PullRequestUser;
  repo: PullRequestRepo;
}

declare interface PullRequestOwner {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
}

declare interface PullRequestLicense {
  key: string;
  name: string;
  spdx_id: string;
  url: string;
  node_id: string;
}

declare interface PullRequestBase {
  label: string;
  ref: string;
  sha: string;
  user: PullRequestUser;
  repo: PullRequestRepo;
}

declare interface PullRequestRepo {
  id: number;
  node_id: string;
  name: string;
  full_name: string;
  private: boolean;
  owner: PullRequestOwner;
  html_url: string;
  description: string;
  fork: boolean;
  url: string;
  forks_url: string;
  keys_url: string;
  collaborators_url: string;
  teams_url: string;
  hooks_url: string;
  issue_events_url: string;
  events_url: string;
  assignees_url: string;
  branches_url: string;
  tags_url: string;
  blobs_url: string;
  git_tags_url: string;
  git_refs_url: string;
  trees_url: string;
  statuses_url: string;
  languages_url: string;
  stargazers_url: string;
  contributors_url: string;
  subscribers_url: string;
  subscription_url: string;
  commits_url: string;
  git_commits_url: string;
  comments_url: string;
  issue_comment_url: string;
  contents_url: string;
  compare_url: string;
  merges_url: string;
  archive_url: string;
  downloads_url: string;
  issues_url: string;
  pulls_url: string;
  milestones_url: string;
  notifications_url: string;
  labels_url: string;
  releases_url: string;
  deployments_url: string;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  git_url: string;
  ssh_url: string;
  clone_url: string;
  svn_url: string;
  homepage: string;
  size: number;
  stargazers_count: number;
  watchers_count: number;
  language: string;
  has_issues: boolean;
  has_projects: boolean;
  has_downloads: boolean;
  has_wiki: boolean;
  has_pages: boolean;
  forks_count: number;
  mirror_url: any;
  archived: boolean;
  disabled: boolean;
  open_issues_count: number;
  license: PullRequestLicense;
  allow_forking: boolean;
  is_template: boolean;
  topics: string[];
  visibility: string;
  forks: number;
  open_issues: number;
  watchers: number;
  default_branch: string;
}

declare interface PullRequestLinks {
  self: PullRequestSelf;
  html: PullRequestHtml;
  issue: PullRequestIssue;
  comments: PullRequestComments;
  review_comments: PullRequestReviewComments;
  review_comment: PullRequestReviewComment;
  commits: PullRequestCommits;
  statuses: PullRequestStatuses;
}

declare interface PullRequestSelf {
  href: string;
}

declare interface PullRequestHtml {
  href: string;
}

declare interface PullRequestIssue {
  href: string;
}

declare interface PullRequestComments {
  href: string;
}

declare interface PullRequestReviewComments {
  href: string;
}

declare interface PullRequestReviewComment {
  href: string;
}

declare interface PullRequestCommits {
  href: string;
}

declare interface PullRequestStatuses {
  href: string;
}
