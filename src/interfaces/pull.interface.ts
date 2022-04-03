export type PullRequestState = 'all' | 'closed' | 'open';

export interface PullRequestDetail {
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
  user: PullRequestDetailUser;
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
  head: PullRequestDetailHead;
  base: PullRequestDetailBase;
  _links: PullRequestDetailLinks;
  author_association: string;
  auto_merge: any;
  active_lock_reason: any;
  merged: boolean;
  mergeable: boolean;
  rebaseable: boolean;
  mergeable_state: string;
  merged_by: any;
  comments: number;
  review_comments: number;
  maintainer_can_modify: boolean;
  commits: number;
  additions: number;
  deletions: number;
  changed_files: number;
}

declare interface PullRequestDetailUser {
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

declare interface PullRequestDetailHead {
  label: string;
  ref: string;
  sha: string;
  user: PullRequestDetailUser;
  repo: PullRequestDetailRepo;
}

declare interface PullRequestDetailRepo {
  id: number;
  node_id: string;
  name: string;
  full_name: string;
  private: boolean;
  owner: PullRequestDetailOwner;
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
  language: any;
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
  license: PullRequestDetailLicense;
  allow_forking: boolean;
  is_template: boolean;
  topics: any[];
  visibility: string;
  forks: number;
  open_issues: number;
  watchers: number;
  default_branch: string;
}

declare interface PullRequestDetailOwner {
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

declare interface PullRequestDetailLicense {
  key: string;
  name: string;
  spdx_id: string;
  url: string;
  node_id: string;
}

declare interface PullRequestDetailBase {
  label: string;
  ref: string;
  sha: string;
  user: PullRequestDetailUser;
  repo: PullRequestDetailRepo;
}

declare interface PullRequestDetailLinks {
  self: PullRequestDetailSelf;
  html: PullRequestDetailHtml;
  issue: PullRequestDetailIssue;
  comments: PullRequestDetailComments;
  review_comments: PullRequestDetailReviewComments;
  review_comment: PullRequestDetailReviewComment;
  commits: PullRequestDetailCommits;
  statuses: PullRequestDetailStatuses;
}

declare interface PullRequestDetailSelf {
  href: string;
}

declare interface PullRequestDetailHtml {
  href: string;
}

declare interface PullRequestDetailIssue {
  href: string;
}

declare interface PullRequestDetailComments {
  href: string;
}

declare interface PullRequestDetailReviewComments {
  href: string;
}

declare interface PullRequestDetailReviewComment {
  href: string;
}

declare interface PullRequestDetailCommits {
  href: string;
}

declare interface PullRequestDetailStatuses {
  href: string;
}
