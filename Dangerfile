# https://danger.systems/reference.html

fail "Pull Request includes merge commits, please rebase instead" if git.commits.any? { |c| c.message =~ /^Merge branch/ }
warn "Please provide a summary in the Pull Request description" if github.pr_body.length < 5
