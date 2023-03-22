# Psychological Councelling app
This repository contains both backend (FastApi) and frontend (React) projects.

![screen](https://user-images.githubusercontent.com/17914041/227014920-9b314459-4ef8-47c2-9e02-0d6a6ad519e3.png)

## Environment management
### Start backend as daemon
```
make backend-up
```

### Start frontend as daemon
```
make frontend-up
```

### Start whole infrastructure as daemon
```
make up
```

### Build selected docker image
```
make <image>-build
```

### Show logs from selected container
####(in real time with -f)
```
docker-compose logs <selected>
```

### Code reformat on selected environment
```
make <selected>-reformat
```

### Check code by linters on selected environment
```
make <selected>-lint
```

### Stop infrastructure
```
make stop
```

### Stop infrastructure and remove all containers
```
make down
```

### Restart running containers
```
make restart
```

### Run shell inside backend container
```
make backend-shell
```
