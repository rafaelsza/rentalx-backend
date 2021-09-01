import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import User from './User';

@Entity('users_tokens')
class UserToken {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  refresh_token: string;

  @Column()
  user_id: string;

  @Column()
  expires_date: Date;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;
}

export default UserToken;
