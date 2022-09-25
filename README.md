# Psychological Councelling app
This repository contains both backend (FastApi) and frontend (React) projects for my engineering work.

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
