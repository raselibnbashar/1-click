function getData() {
  const profileUrl = window.location.href;
  const usernameMatch = profileUrl.match(/\/in\/(.*)\//);
  const username = usernameMatch ? usernameMatch[1] : "";

  return { profileUrl, username };
}
