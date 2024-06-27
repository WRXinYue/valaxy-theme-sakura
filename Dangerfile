# Dangerfile
fail("PR includes merge commits, please rebase instead") if git.commits.any? { |c| c.message =~ /^Merge branch/ }
