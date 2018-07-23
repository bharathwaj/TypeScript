import {GitHubApiService} from './GitHubApiService';
import * as _ from 'lodash';
import {User} from "./User";
import {Repo} from "./Repo";

let svc = new GitHubApiService();

if (process.argv.length < 3) {
    console.log('Please pass the argument');
}
else {
    let userName = process.argv[2];
    svc.getUserInfo(userName, (user: User) => {
        svc.getRepos(userName, (repos: Repo[]) => {
            let sortedRepos = _.sortBy(repos, [(repo: Repo) => repo.size * -1]);
            user.repos = _.take(sortedRepos, 3);
            console.log(user)
        })
    });

}

