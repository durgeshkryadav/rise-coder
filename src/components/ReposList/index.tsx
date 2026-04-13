import List from '@/components/List';
import ListItem from '@/components/ListItem';
import LoadingIndicator from '@/components/LoadingIndicator';
import type { Repo } from '@/types';

interface ReposListProps {
  loading: boolean;
  error: boolean | Error;
  repos: Repo[] | false;
}

function ReposList({ loading, error, repos }: ReposListProps) {
  if (loading) {
    return <LoadingIndicator />;
  }

  if (error !== false) {
    return (
      <List>
        <ListItem item="Something went wrong, please try again!" />
      </List>
    );
  }

  if (repos !== false) {
    return (
      <List>
        {repos.map((repo) => (
          <ListItem key={repo.full_name} item={repo.name} />
        ))}
      </List>
    );
  }

  return null;
}

export default ReposList;
