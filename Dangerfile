fail("Pull Request includes merge commits, please rebase instead") if git.commits.any? { |c| c.message =~ /^Merge branch/ }
fail("Please provide a summary in the Pull Request description") if github.pr_body.length < 5
